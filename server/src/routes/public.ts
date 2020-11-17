import express from 'express';
import db from '../db';
import _ from 'lodash';

import { parsePaths } from './util';

const router = express.Router();

// Kinase List > Sites
router.get('/phosphosites', async (req, res) => {
  const { kinase, detailed } = req.query;

  let query;
  const fields = [];
  if (kinase && detailed === 'true') {
    query = `SELECT DISTINCT x.location, x.residue, x.detected_in, COALESCE(y.PsT_effect, 'unknown') AS pst_effect, x.reported_substrate_of, x.reported_pdt_of 
              FROM 
              (SELECT gene_name, residue, location, detected_in, reported_substrate_of, reported_pdt_of 
              FROM substrates_detailed where gene_name=$1) AS x 
              LEFT JOIN 
              (SELECT TProtein, PsT_effect, residue_type, residue_offset from known_sign where TProtein = $2) AS y 
              ON x.residue = y.residue_type and x.location = y.residue_offset`;
    fields.push(kinase);
    fields.push(kinase);
  } else if (kinase) {
    query = `SELECT DISTINCT substrate_id AS substrate 
              FROM Substrate 
              WHERE substrate_id LIKE $1 
              ORDER BY substrate_id`;
    fields.push(`%${kinase}(%`);
  } else {
    query = `SELECT substrate_id AS substrate 
              FROM Substrate`;
  }

  try {
    const results = await db.query(query, fields);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/observation', async (req, res) => {
  const { cellLine, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value } = req.query;

  let query = `SELECT cell_line, perturbagen, substrate, fold_change, p_value, cv 
                FROM Observation WHERE `;

  const fields = [];

  if (_.isEmpty(req.query)) {
    const requiredAtLeastOneOf = 'cellLine, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value';
    return res.status(400).send({ requiredAtLeastOneOf });
  }

  let count = 1;
  if (cellLine) {
    query += 'cell_line = $' + count + ' AND ';
    fields.push(cellLine);
    count += 1;
  }
  if (perturbagen) {
    query += 'perturbagen = $' + count + ' AND ';
    fields.push(perturbagen);
    count += 1;
  }
  if (substrate) {
    query += 'substrate = $' + count + ' AND ';
    fields.push(substrate);
    count += 1;
  }
  if (min_fold_change) {
    query += 'cast(fold_change as float) > $' + count + ' AND ';
    fields.push(min_fold_change);
    count += 1;
  }
  if (max_fold_change) {
    query += 'cast(fold_change as float) < $' + count + ' AND ';
    fields.push(max_fold_change);
    count += 1;
  }
  if (min_p_value) {
    query += 'cast(p_value as float) > $' + count + ' AND ';
    fields.push(min_p_value);
    count += 1;
  }
  if (max_p_value) {
    query += 'cast(p_value as float) < $' + count + ' AND ';
    fields.push(max_p_value);
  }

  // Removing ' and' at the end
  query = query.slice(0, -4);

  try {
    const results = await db.query(query, fields);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Kinase details > Known perturbagens
router.get('/knownPerturbagens', async (req, res) => {
  const { kinase } = req.query;

  let query = `SELECT perturbagen, source, score, chemspider_id, action, synonyms 
                FROM PK_relationship 
                JOIN Perturbagen ON PK_relationship.perturbagen = Perturbagen.name `;

  const fields = [];

  if (kinase) {
    query += `WHERE PK_relationship.kinase = $1 
                ORDER BY perturbagen`;
    fields.push(kinase);
  }

  try {
    const results = await db.query(query, fields);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Kinase details > Known substrates
router.get('/knownSubstrates', async (req, res) => {
  const { KPa } = req.query;

  let query = `SELECT PsT, sources 
                FROM known_target `;
  const fields = [];

  if (KPa) {
    query = `SELECT PsT, sources, EVERY(fold_change IS NOT NULL) AS observation_exists 
              FROM known_target 
              LEFT JOIN Observation ON PsT = Observation.substrate 
              WHERE KPa = $1 
              GROUP BY PsT, sources ORDER BY PsT`;
    fields.push(KPa);
  }

  try {
    const results = await db.query(query, fields);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Perturbagen details > Known targets
router.get('/knownTargets', async (req, res) => {
  const { perturbagen } = req.query;

  const query = `SELECT kinase, source, score FROM PK_relationship 
                  WHERE perturbagen = $1 
                  ORDER BY kinase`;

  try {
    const results = await db.query(query, [perturbagen]);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Shared PDTs for kinase @kinasedetails/pdts
router.get('/pdts', async (req, res) => {
  const { kinase, cell_line } = req.query;

  if (!kinase || !cell_line) return res.status(400).send({ requiredFields: 'kinase, cell_line' });

  const query = `SELECT main.substrate, substrate.uniprot_name, main.confidence, main.shared_with 
      FROM 
      (SELECT x.substrate, x.confidence, STRING_AGG(y.kinase, ', ') AS shared_with 
        FROM 
        (SELECT * FROM KS_relationship 
          WHERE kinase = $1 AND source='PDT' AND cell_line = $2 AND confidence != '0.0' AND confidence != '-1.0') AS x 
          LEFT JOIN 
          (SELECT * FROM KS_relationship WHERE source='PDT' AND cell_line = $3 AND confidence != '0.0' AND confidence != '-1.0') AS y 
          ON x.substrate = y.substrate AND x.kinase != y.kinase 
        GROUP BY x.substrate, x.confidence) AS main 
        LEFT JOIN substrate ON main.substrate = substrate.substrate_id 
        ORDER BY main.substrate`;

  try {
    const results = await db.query(query, [kinase, cell_line, cell_line]);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Prolog things
router.get('/pathway', async (req, res) => {
  const { cellLine, perturbagen, substrate, onlyKinaseEnds } = req.query;

  if (!(cellLine && perturbagen && substrate && onlyKinaseEnds)) {
    const requiredFields = 'cellLine, perturbagen, substrate, onlyKinaseEnds';
    return res.status(400).send({ requiredFields });
  }

  const query = `SELECT path, explanation, inhibited 
                  FROM Paths 
                  WHERE cellLine = $1 AND perturbagen = $2 AND substrate = $3`;

  try {
    const results = await db.query(query, [cellLine, perturbagen, substrate]);
    res.send(parsePaths(results.rows));
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
