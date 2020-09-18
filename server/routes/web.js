import express from 'express';
import { db } from '../main';

const router = new express.Router();

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

  const query =
    'select substrate, fold_change from Observation_valid where perturbagen = ? and cell_line = ? order by fold_change';
  db.all(query, [perturbagen, cellLine], (err, rows) => {
    if (err) throw err;

    const parsedRows = rows.map(
      ({ substrate, fold_change }) => `${substrate}, fc: ${parseFloat(fold_change, 10).toFixed(2)}`
    );
    res.send(parsedRows);
  });
});

export default router;
