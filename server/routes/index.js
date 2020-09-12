const express = require('express');
const path = require('path');

const db = require('../index');

const router = new express.Router();

// Kinase List
router.get('/api/getKinaseList/', (req, res) => {
  const query = 'select * from Protein where kinase_name <> "" order by kinase_name';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Kinase List > Sites
router.get('/api/getPhosphosites/', (req, res) => {
  const kinase = req.query.kinase;

  const query = `select distinct substrate_id from Substrate where substrate_id like ?`;
  db.all(query, [`%${kinase}(%`], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Perturbagen List
router.get('/api/getPerturbagenList/', (req, res) => {
  const query = 'select * from Perturbagen group by name order by name';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Global Search
router.get('/api/getAllPerturbagens', (req, res) => {
  const query = 'select distinct name as perturbagen from perturbagen';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Global Search
router.get('/api/getAllKinases', (req, res) => {
  const query = 'select distinct kinase_name as kinase from protein where kinase_name not null';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Global Search
router.get('/api/getAllSubstrates', (req, res) => {
  const query = 'select distinct substrate_id as substrate from substrate';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getObservation', (req, res) => {
  const purpose = req.query.for;
  const substrate = req.query.substrate;
  const cell_line = req.query.cell_line;
  const perturbagen = req.query.perturbagen;

  let query = '';
  let vars = [];
  if (purpose === 'obsData') {
    query = `Select substrate, cell_line, fold_change, p_value, cv from Observation where perturbagen = ? and fold_change <> -888 and p_value <> -888 order by cell_line, substrate`;
    vars = [perturbagen];
  } else if (purpose === 'pathway') {
    query = `select substrate, fold_change, p_value from observation where perturbagen = ? and cell_line = ?`;
    vars = [perturbagen, cell_line];
  } else if (purpose === 'heatMap') {
    query = `select perturbagen, cell_line, fold_change from observation where substrate = ? and fold_change > -888`;
    vars = [substrate];
  } else if (purpose === 'barChart') {
    query = `select perturbagen, fold_change from observation where substrate = ? and cell_line = ? and p_value > -888 and fold_change > -888 order by perturbagen`;
    vars = [substrate, cell_line];
  }

  db.all(query, vars, (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Kinase details > Known perturbagens
router.get('/api/getKnownPerturbagens', (req, res) => {
  const kinase = req.query.kinase;

  const query = `select perturbagen, source, score from PK_relationship where kinase = ? order by perturbagen`;
  db.all(query, [kinase], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Kinase details > Known substrates
router.get('/api/getKnownSubstrates', (req, res) => {
  const KPa = req.query.KPa;

  const query = `select PsT, sources from known_target where KPa = ? order by PsT`;
  db.all(query, [KPa], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Perturbagen details > Known targets
router.get('/api/getKnownTargets', (req, res) => {
  const perturbagen = req.query.perturbagen;

  const query = `select kinase, source, score from PK_relationship where perturbagen = ? order by kinase`;
  db.all(query, [perturbagen], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Substrates for protein @kinasedetails/description
router.get('/api/phosphositesOfInterest/', (req, res) => {
  const protein = req.query.protein;

  const query =
    `select distinct x.location, x.residue, x.detected_in, coalesce(y.PsT_effect, 'unknown') as pst_effect, ` +
    `x.reported_substrate_of, x.reported_pdt_of from ` +
    `(select gene_name, residue, location, detected_in, reported_substrate_of, reported_pdt_of ` +
    `from substrates_detailed where gene_name=?) as x ` +
    `left join ` +
    `(select TProtein, PsT_effect, residue_type, residue_offset from known_sign where TProtein = ?) as y ` +
    `on x.residue = y.residue_type and x.location = y.residue_offset`;

  db.all(query, [protein], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

// Shared PDTs for kinase @kinasedetails/pdts
router.get('/api/pdts/', (req, res) => {
  const kinase = req.query.kinase;
  const cell_line = req.query.cell_line;

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

// Valid observations
router.get('/api/getValidObservations', (req, res) => {
  const perturbagen = req.query.perturbagen;
  const cell_line = req.query.cell_line;

  const query =
    'select substrate from Observation_valid where perturbagen = ? and cell_line = ? order by substrate';
  db.all(query, [perturbagen, cell_line], (err, rows) => {
    if (err) throw err;

    // const parsedRows = rows.map(
    //   ({ substrate, fold_change }) => `${substrate}, fc: ${parseFloat(fold_change, 10).toFixed(2)}`
    // );
    res.send(rows);
  });
});

// Prolog things
const queryProlog = require('../swipl/index');
const swipl = require('swipl');
router.get('/api/pathway', (req, res) => {
  const { cellLine, perturbagen, substrate, onlyKinaseEnds } = req.query;

  const queryString = `perturbed_path_init('MCF7', '${perturbagen}', '${substrate}', Path, Explanation, Inhibited).`;
  const pathwayData = queryProlog(swipl, queryString, perturbagen, onlyKinaseEnds);

  res.send(pathwayData);
});

// Catch all for deploy
router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

module.exports = router;
