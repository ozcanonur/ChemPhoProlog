import express from 'express';
import db from '../db';

const router = express.Router();

// Kinase List
router.get('/kinases', async (_req, res) => {
  const queryKinaseData = `SELECT * 
                            FROM protein 
                            WHERE kinase_name IS NOT NULL 
                            ORDER BY kinase_name`;
  const queryKinasesWithPhosphosites = `SELECT DISTINCT kinase_name 
                                          FROM protein 
                                          JOIN substrate ON kinase_name IS NOT NULL AND substrate.gene_name = protein.gene_name`;
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
  const query = `SELECT description, families, gene_synonyms, expressed_in 
                  FROM Protein 
                  WHERE kinase_name = $1`;

  try {
    const results = await db.query(query, [kinase]);
    res.send(results.rows[0]);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Global Search
router.get('/getAllKinases', async (_req, res) => {
  const query = `SELECT DISTINCT kinase_name AS kinase 
                  FROM protein 
                  WHERE kinase_name IS NOT NULL`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Perturbagen List
router.get('/getPerturbagenList', async (_req, res) => {
  const query = `SELECT * 
                  FROM Perturbagen 
                  ORDER BY name`;

  try {
    const results = await db.query(query);
    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

// Global Search
router.get('/getAllSubstrates', async (_req, res) => {
  const query = `SELECT DISTINCT substrate_id AS substrate 
                  FROM substrate`;

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

  const query = `SELECT substrate, fold_change, pathcount 
                  FROM pathcounts 
                  WHERE cellLine = $1 AND perturbagen = $2 
                  ORDER BY substrate`;

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

  const query = `WITH x as (
                  SELECT substrate, cellline, STRING_AGG(perturbagen, ',') AS perturbagens 
                  FROM pathcounts 
                  GROUP BY cellline, substrate
                )
                SELECT x.substrate, x.cellLine, x.perturbagens 
                FROM x JOIN known_target 
                ON x.substrate = known_target.PsT AND known_target.KpA = $1`;

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

  const query = `SELECT substrate, cellline, STRING_AGG(perturbagen, ',') AS perturbagens 
                  FROM pathcounts
                  WHERE substrate LIKE $1 
                  GROUP BY cellline, substrate`;

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

  const query = `SELECT substrate, fold_change, p_value 
                  FROM Observation 
                  WHERE cell_line = $1 AND perturbagen = $2 AND substrate IN (${parsedSubstrates})`;

  try {
    const results = await db.query(query, [cellLine, perturbagen]);

    res.send(results.rows);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/observationForHeatmap', async (req, res) => {
  const { substrate } = req.query;

  const query = `SELECT perturbagen, substrate, cell_line, fold_change 
                  FROM Observation 
                  WHERE substrate = $1 AND CAST(fold_change AS float) > -888`;

  try {
    const results = await db.query(query, [substrate]);
    const decimalsCut = results.rows.map((e) => {
      return {
        ...e,
        fold_change: Math.round(parseFloat(e.fold_change) * 1e3) / 1e3,
      };
    });
    res.send(decimalsCut);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/observationForBarchart', async (req, res) => {
  const { cellLine, substrate } = req.query;

  const query = `SELECT perturbagen, fold_change, p_value 
                  FROM Observation 
                  WHERE cell_line = $1 AND substrate = $2 AND CAST(fold_change AS float) > -888 AND CAST(p_value AS float) > -888`;

  try {
    const results = await db.query(query, [cellLine, substrate]);
    const decimalsCut = results.rows.map((e) => {
      return {
        ...e,
        fold_change: Math.round(parseFloat(e.fold_change) * 1e2) / 1e2,
        p_value: Math.round(parseFloat(e.p_value) * 1e4) / 1e4,
      };
    });

    res.send(decimalsCut);
  } catch (err) {
    res.sendStatus(500);
  }
});

router.get('/knownPerturbagens', async (req, res) => {
  const { kinase } = req.query;

  let query = `SELECT perturbagen, source, score, chemspider_id 
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

export default router;
