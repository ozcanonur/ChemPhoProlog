import express from 'express';
import db from '../db';
import _ from 'lodash';

import { parsePaths } from './util';

const router = express.Router();

// Kinase List > Sites
router.get('/phosphosites', (req, res) => {
  const { kinase, detailed } = req.query;

  let query;
  const fields = [];
  if (kinase && detailed === 'true') {
    query =
      `select distinct x.location, x.residue, x.detected_in, coalesce(y.PsT_effect, 'unknown') as pst_effect, ` +
      `x.reported_substrate_of, x.reported_pdt_of from ` +
      `(select gene_name, residue, location, detected_in, reported_substrate_of, reported_pdt_of ` +
      `from substrates_detailed where gene_name=?) as x ` +
      `left join ` +
      `(select TProtein, PsT_effect, residue_type, residue_offset from known_sign where TProtein = ?) as y ` +
      `on x.residue = y.residue_type and x.location = y.residue_offset`;
    fields.push(kinase);
    fields.push(kinase);
  } else if (kinase) {
    query = `select distinct substrate_id as substrate from Substrate where substrate_id like ? order by substrate_id`;
    fields.push(`%${kinase}(%`);
  } else query = `select substrate_id as substrate from Substrate`;

  db.all(query, fields, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/observation', (req, res) => {
  const { cellLine, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value } = req.query;

  let query = 'Select cell_line, perturbagen, substrate, fold_change, p_value, cv from Observation where ';
  const fields = [];

  if (_.isEmpty(req.query)) {
    const requiredAtLeastOneOf = 'cellLine, perturbagen, substrate, min_fold_change, max_fold_change, min_p_value, max_p_value';
    return res.status(400).send({ requiredAtLeastOneOf });
  }

  if (cellLine) {
    query += 'cell_line = ?';
    fields.push(cellLine);
  }
  if (perturbagen) {
    query += 'perturbagen = ?';
    fields.push(perturbagen);
  }
  if (substrate) {
    query += 'substrate = ?';
    fields.push(substrate);
  }
  if (min_fold_change) {
    query += 'fold_change > ?';
    fields.push(min_fold_change);
  }
  if (max_fold_change) {
    query += 'fold_change < ?';
    fields.push(max_fold_change);
  }
  if (min_p_value) {
    query += 'p_value > ?';
    fields.push(min_p_value);
  }
  if (max_p_value) {
    query += 'p_value < ?';
    fields.push(max_p_value);
  }

  query = query.split('?').join('? and ').slice(0, -4);

  db.all(query, fields, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Kinase details > Known perturbagens
router.get('/knownPerturbagens', (req, res) => {
  const { kinase } = req.query;

  let query =
    'select perturbagen, source, score, chemspider_id, action, synonyms from PK_relationship join Perturbagen on PK_relationship.perturbagen = Perturbagen.name ';
  const fields = [];

  if (kinase) {
    query += 'where PK_relationship.kinase = ? order by perturbagen';
    fields.push(kinase);
  }

  db.all(query, fields, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Kinase details > Known substrates
router.get('/knownSubstrates', (req, res) => {
  const { KPa } = req.query;

  let query = 'select PsT, sources from known_target ';
  const fields = [];

  if (KPa) {
    query += 'where KPa = ? order by PsT';
    fields.push(KPa);
  }

  db.all(query, fields, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Perturbagen details > Known targets
router.get('/knownTargets', (req, res) => {
  const { perturbagen } = req.query;

  const query = `select kinase, source, score from PK_relationship where perturbagen = ? order by kinase`;
  db.all(query, [perturbagen], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Shared PDTs for kinase @kinasedetails/pdts
router.get('/pdts', (req, res) => {
  const { kinase, cell_line } = req.query;

  if (!kinase || !cell_line) return res.status(400).send({ requiredFields: 'kinase, cell_line' });

  const query =
    `select main.substrate, substrate.uniprot_name, main.confidence, main.shared_with from ` +
    `(select x.substrate, x.confidence, group_concat(y.kinase, ', ') as shared_with from ` +
    `(select * from KS_relationship where kinase = ? and source='PDT' and cell_line = ? ` +
    `and confidence <> '0.0' and confidence <> '-1.0') as x ` +
    `left join ` +
    `(select * from KS_relationship where source='PDT' and cell_line = ? and confidence <> '0.0' and confidence <> '-1.0') as y ` +
    `on x.substrate = y.substrate and x.kinase <> y.kinase group by x.substrate) as main ` +
    `left join substrate on main.substrate = substrate.substrate_id order by main.substrate`;

  db.all(query, [kinase, cell_line, cell_line], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Prolog things
router.get('/pathway', (req, res) => {
  const { cellLine, perturbagen, substrate, onlyKinaseEnds } = req.query;

  if (!(cellLine && perturbagen && substrate && onlyKinaseEnds)) {
    const requiredFields = 'cellLine, perturbagen, substrate, onlyKinaseEnds';
    return res.status(400).send({ requiredFields });
  }

  const query = `select path, explanation, inhibited from Paths where cellLine = ? and perturbagen = ? and substrate = ?`;
  db.all(query, [cellLine, perturbagen, substrate], (err, rows) => {
    if (err) throw err;
    res.send(parsePaths(rows));
  });
});

export default router;
