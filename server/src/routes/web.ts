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

  const query = 'select substrate, fold_change, pathCount from pathCounts where cellLine = ? and perturbagen = ? order by substrate';
  db.all(query, [cellLine, perturbagen], (err, rows) => {
    if (err) throw err;

    const parsedRows: { [key: string]: any } = {};
    rows.forEach(({ substrate, fold_change, pathCount }) => {
      parsedRows[substrate] = { foldChange: parseFloat(fold_change).toFixed(2), pathCount };
    });
    res.send(parsedRows);
  });
});

router.get('/substratesWithPaths', (req, res) => {
  const { kinase } = req.query;

  const query =
    'select x.substrate, x.cellLine, x.perturbagens from (select substrate, cellLine, group_concat(perturbagen) as perturbagens from pathCounts group by cellLine, substrate) as x join known_target as y on x.substrate = y.PsT and y.KpA = ?';

  db.all(query, [kinase], (err, rows) => {
    if (err) throw err;

    const parsedRows: { [key: string]: any } = {};
    rows.forEach((row: { substrate: string; cellLine: string; perturbagens: string }) => {
      const { substrate, cellLine, perturbagens } = row;
      if (!parsedRows[substrate]) parsedRows[substrate] = { [cellLine]: perturbagens };
      else parsedRows[substrate][cellLine] = perturbagens;
    });

    res.send(parsedRows);
  });
});

router.get('/phosphositesWithPaths', (req, res) => {
  const { kinase } = req.query;

  const query =
    'select substrate, cellLine, group_concat(perturbagen) as perturbagens from pathCounts where substrate like ? group by cellLine, substrate';

  db.all(query, [`%${kinase}(%`], (err, rows) => {
    if (err) throw err;

    const parsedRows: { [key: string]: any } = {};
    rows.forEach((row: { substrate: string; cellLine: string; perturbagens: string }) => {
      const { substrate, cellLine, perturbagens } = row;
      if (!parsedRows[substrate]) parsedRows[substrate] = { [cellLine]: perturbagens };
      else parsedRows[substrate][cellLine] = perturbagens;
    });

    res.send(parsedRows);
  });
});

export default router;
