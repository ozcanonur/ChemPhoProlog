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
    query =
      `select distinct x.location, x.residue, x.detected_in, coalesce(y.PsT_effect, 'unknown') as pst_effect, ` +
      `x.reported_substrate_of, x.reported_pdt_of from ` +
      `(select gene_name, residue, location, detected_in, reported_substrate_of, reported_pdt_of ` +
      `from substrates_detailed where gene_name=$1) as x ` +
      `left join ` +
      `(select TProtein, PsT_effect, residue_type, residue_offset from known_sign where TProtein = $2) as y ` +
      `on x.residue = y.residue_type and x.location = y.residue_offset`;
    fields.push(kinase);
    fields.push(kinase);
  } else if (kinase) {
    query = `select distinct substrate_id as substrate from Substrate where substrate_id like $1 order by substrate_id`;
    fields.push(`%${kinase}(%`);
  } else query = `select substrate_id as substrate from Substrate`;

  try {
    const results = await db.query(query, fields);
    res.send(results.rows);
  } catch (err) {
    throw err;
  }
});

router.get('/observation', async (req, res) => {
  const { cellLine, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value } = req.query;

  let query = 'Select cell_line, perturbagen, substrate, fold_change, p_value, cv from Observation where ';
  const fields = [];

  if (_.isEmpty(req.query)) {
    const requiredAtLeastOneOf = 'cellLine, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value';
    return res.status(400).send({ requiredAtLeastOneOf });
  }

  let count = 1;
  if (cellLine) {
    query += 'cell_line = $' + count + ' and ';
    fields.push(cellLine);
    count += 1;
  }
  if (perturbagen) {
    query += 'perturbagen = $' + count + ' and ';
    fields.push(perturbagen);
    count += 1;
  }
  if (substrate) {
    query += 'substrate = $' + count + ' and ';
    fields.push(substrate);
    count += 1;
  }
  if (min_fold_change) {
    query += 'cast(fold_change as float) > $' + count + ' and ';
    fields.push(min_fold_change);
    count += 1;
  }
  if (max_fold_change) {
    query += 'cast(fold_change as float) < $' + count + ' and ';
    fields.push(max_fold_change);
    count += 1;
  }
  if (min_p_value) {
    query += 'cast(p_value as float) > $' + count + ' and ';
    fields.push(min_p_value);
    count += 1;
  }
  if (max_p_value) {
    query += 'cast(p_value as float) < $' + count + ' and ';
    fields.push(max_p_value);
  }

  // Removing ' and' at the end
  query = query.slice(0, -4);

  try {
    const results = await db.query(query, fields);

    res.send(results.rows);
  } catch (err) {
    throw err;
  }
});

// Kinase details > Known perturbagens
router.get('/knownPerturbagens', async (req, res) => {
  const { kinase } = req.query;

  let query =
    'select perturbagen, source, score, chemspider_id, action, synonyms from PK_relationship join Perturbagen on PK_relationship.perturbagen = Perturbagen.name ';
  const fields = [];

  if (kinase) {
    query += 'where PK_relationship.kinase = $1 order by perturbagen';
    fields.push(kinase);
  }

  try {
    const results = await db.query(query, fields);

    res.send(results.rows);
  } catch (err) {
    throw err;
  }
});

// Kinase details > Known substrates
router.get('/knownSubstrates', async (req, res) => {
  const { KPa } = req.query;

  let query = 'select PsT, sources from known_target ';
  const fields = [];

  if (KPa) {
    query += 'where KPa = $1 order by PsT';
    fields.push(KPa);
  }

  try {
    const results = await db.query(query, fields);

    res.send(results.rows);
  } catch (err) {
    throw err;
  }
});

// Perturbagen details > Known targets
router.get('/knownTargets', async (req, res) => {
  const { perturbagen } = req.query;

  const query = `select kinase, source, score from PK_relationship where perturbagen = $1 order by kinase`;

  try {
    const results = await db.query(query, [perturbagen]);

    res.send(results.rows);
  } catch (err) {
    throw err;
  }
});

// Shared PDTs for kinase @kinasedetails/pdts
router.get('/pdts', async (req, res) => {
  const { kinase, cell_line } = req.query;

  if (!kinase || !cell_line) return res.status(400).send({ requiredFields: 'kinase, cell_line' });

  const query =
    `select main.substrate, substrate.uniprot_name, main.confidence, main.shared_with from ` +
    `(select x.substrate, x.confidence, string_agg(y.kinase, ', ') as shared_with from ` +
    `(select * from KS_relationship where kinase = $1 and source='PDT' and cell_line = $2 ` +
    `and confidence <> '0.0' and confidence <> '-1.0') as x ` +
    `left join ` +
    `(select * from KS_relationship where source='PDT' and cell_line = $3 and confidence <> '0.0' and confidence <> '-1.0') as y ` +
    `on x.substrate = y.substrate and x.kinase <> y.kinase group by x.substrate, x.confidence) as main ` +
    `left join substrate on main.substrate = substrate.substrate_id order by main.substrate`;

  try {
    const results = await db.query(query, [kinase, cell_line, cell_line]);
    res.send(results.rows);
  } catch (err) {
    throw err;
  }
});

// Prolog things
router.get('/pathway', async (req, res) => {
  const { cellLine, perturbagen, substrate, onlyKinaseEnds } = req.query;

  if (!(cellLine && perturbagen && substrate && onlyKinaseEnds)) {
    const requiredFields = 'cellLine, perturbagen, substrate, onlyKinaseEnds';
    return res.status(400).send({ requiredFields });
  }

  const query = `select path, explanation, inhibited from Paths where cellLine = $1 and perturbagen = $2 and substrate = $3`;

  try {
    const results = await db.query(query, [cellLine, perturbagen, substrate]);
    res.send(parsePaths(results.rows));
  } catch (err) {
    throw err;
  }
});

export default router;
