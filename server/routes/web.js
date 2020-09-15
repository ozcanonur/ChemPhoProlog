const express = require('express');
const db = require('../index');
const path = require('path');

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
  const perturbagen = req.query.perturbagen;
  const cell_line = req.query.cell_line;

  const query =
    'select substrate, fold_change from Observation_valid where perturbagen = ? and cell_line = ? order by fold_change';
  db.all(query, [perturbagen, cell_line], (err, rows) => {
    if (err) throw err;

    const parsedRows = rows.map(
      ({ substrate, fold_change }) => `${substrate}, fc: ${parseFloat(fold_change, 10).toFixed(2)}`
    );
    res.send(parsedRows);
  });
});

// Catch all for deploy
router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

module.exports = router;
