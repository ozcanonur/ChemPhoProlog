import express from 'express';
import db from '../db';

const router = express.Router();

// Kinase List
router.get('/kinases', async (_req, res) => {
  const queryKinaseData = `select * from protein where kinase_name is not null order by kinase_name`;
  const queryKinasesWithPhosphosites = `select distinct kinase_name from protein join substrate on kinase_name is not null and substrate.gene_name = protein.gene_name`;
  try {
    const resultsKinaseData = await db.query(queryKinaseData);
    const resultsKinasesWithPhosphosites = await db.query(queryKinasesWithPhosphosites);

    const parsedPhosphosites = resultsKinasesWithPhosphosites.rows.map((row) => row.kinase_name);
    res.send({ data: resultsKinaseData.rows, kinasesWithPhosphosites: parsedPhosphosites });
  } catch (err) {
    res.sendStatus(500);
  }
});

// Get specific kinase info
router.get('/kinaseInfo', async (req, res) => {
  const { kinase } = req.query;
  const query = 'select description, families, gene_synonyms, expressed_in from Protein where kinase_name = $1';

  try {
    const results = await db.query(query, [kinase]);
    res.send(results.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Global Search
router.get('/getAllKinases', async (_req, res) => {
  const query = 'select distinct kinase_name as kinase from protein where kinase_name is not null';

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Perturbagen List
router.get('/getPerturbagenList', async (_req, res) => {
  const query = 'select * from Perturbagen order by name';

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Global Search
router.get('/getAllSubstrates', async (_req, res) => {
  const query = 'select distinct substrate_id as substrate from substrate';

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Valid observations
router.get('/validObservation', async (req, res) => {
  const { cellLine, perturbagen } = req.query;

  const query = 'select substrate, fold_change, pathcount from pathcounts where cellLine = $1 and perturbagen = $2 order by substrate';

  try {
    const results = await db.query(query, [cellLine, perturbagen]);

    const parsedRows: { [key: string]: any } = {};
    results.rows.forEach(({ substrate, fold_change, pathcount }) => {
      parsedRows[substrate] = { foldChange: parseFloat(fold_change).toFixed(2), pathcount };
    });
    res.send(parsedRows);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/substratesWithPaths', async (req, res) => {
  const { kinase } = req.query;

  const query = `select x.substrate, x.cellLine, x.perturbagens from (select substrate, cellline, string_agg(perturbagen, ',') as perturbagens from pathcounts group by cellline, substrate) as x join known_target as y on x.substrate = y.PsT and y.KpA = $1`;

  try {
    const results = await db.query(query, [kinase]);

    const parsedRows: { [key: string]: any } = {};
    results.rows.forEach((row: { substrate: string; cellline: string; perturbagens: string }) => {
      const { substrate, cellline, perturbagens } = row;
      if (!parsedRows[substrate]) parsedRows[substrate] = { [cellline]: perturbagens };
      else parsedRows[substrate][cellline] = perturbagens;
    });

    res.send(parsedRows);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/phosphositesWithPaths', async (req, res) => {
  const { kinase } = req.query;

  const query = `select substrate, cellline, string_agg(perturbagen, ',') as perturbagens from pathcounts where substrate like $1 group by cellline, substrate`;

  try {
    const results = await db.query(query, [`%${kinase}(%`]);

    const parsedRows: { [key: string]: any } = {};
    results.rows.forEach((row: { substrate: string; cellline: string; perturbagens: string }) => {
      const { substrate, cellline, perturbagens } = row;
      if (!parsedRows[substrate]) parsedRows[substrate] = { [cellline]: perturbagens };
      else parsedRows[substrate][cellline] = perturbagens;
    });

    res.send(parsedRows);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/observationForPathway', async (req, res) => {
  const { cellLine, perturbagen, substrates } = req.query;

  // @ts-ignore
  const parsedSubstrates = substrates.map((substrate) => `'${substrate}'`).join(',');

  const query = `Select substrate, fold_change, p_value from Observation where cell_line = $1 and perturbagen = $2 and substrate in (${parsedSubstrates})`;

  try {
    const results = await db.query(query, [cellLine, perturbagen]);

    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default router;
