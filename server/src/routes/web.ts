import express from 'express';
import db from '../db';

const router = express.Router();

// Get specific kinase info
router.get('/kinaseInfo', (req, res) => {
  const { kinase } = req.query;
  const query = 'select description, families, gene_synonyms, expressed_in from Protein where kinase_name = ?';
  db.all(query, [kinase], (err, rows) => {
    if (err) throw err;
    res.send(rows[0]);
  });
});

// Kinase List
router.get('/getKinaseList', (req, res) => {
  const query = 'select * from Protein where kinase_name <> "" order by kinase_name';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Global Search
router.get('/getAllKinases', (req, res) => {
  const query = 'select distinct kinase_name as kinase from protein where kinase_name not null';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Perturbagen List
router.get('/getPerturbagenList', (req, res) => {
  const query = 'select * from Perturbagen group by name order by name';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Global Search
router.get('/getAllSubstrates', (req, res) => {
  const query = 'select distinct substrate_id as substrate from substrate';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Valid observations
router.get('/validObservation', (req, res) => {
  const { cellLine, perturbagen } = req.query;

  const query = 'select substrate, fold_change from pathCounts where cell_line = ? and perturbagen = ? order by maxDepth desc';
  db.all(query, [cellLine, perturbagen], (err, rows) => {
    if (err) throw err;

    const parsedRows = rows.map(({ substrate, fold_change }) => `${substrate}, fc: ${parseFloat(fold_change).toFixed(2)}`);
    res.send(parsedRows);
  });
});

export default router;
