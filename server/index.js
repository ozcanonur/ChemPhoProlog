const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const parse = require('csv-parse');
const fs = require('fs').promises;
const _ = require('lodash');
const path = require('path');
const { parseCSVToPaths } = require('./pathwayParser');

const router = express();
router.use(express.static('../client/build'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`Listening on port ${port}`));

// Connect to the DB
const db = new sqlite3.Database('../chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to ChemphoproDB');
});

// General api
router.get('/api/api/', (req, res) => {
  const queryString = req.query.query;
  db.all(queryString, [], (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

router.get('/api/getAllPerturbagens', (req, res) => {
  const query = 'select distinct name as perturbagen from perturbagen';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getAllKinases', (req, res) => {
  const query = 'select distinct kinase_name as kinase from protein where kinase_name not null';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getAllSubstrates', (req, res) => {
  const query = 'select distinct substrate_id as substrate from substrate';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getKinaseList/', (req, res) => {
  const query = 'select * from Protein where kinase_name <> "" order by kinase_name';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getPerturbagenList/', (req, res) => {
  const query = 'select * from Perturbagen group by name order by name';
  db.all(query, [], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getPhosphosites/', (req, res) => {
  const kinase = req.query.kinase;

  const query = `select distinct substrate_id from Substrate where substrate_id like ?`;
  db.all(query, [`%${kinase}(%`], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getObservation/', (req, res) => {
  const substrate = req.query.substrate;

  const query = `select perturbagen, cell_line, fold_change from observation where substrate = ? and fold_change > -888`;
  db.all(query, [substrate], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getObservationFC/', (req, res) => {
  const substrate = req.query.substrate;
  const cell_line = req.query.cell_line;

  const query = `select perturbagen, fold_change from observation where substrate = ? and cell_line = ? and p_value > -888 and fold_change > -888 order by perturbagen`;
  db.all(query, [substrate, cell_line], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getObservationPerturbagen', (req, res) => {
  const perturbagen = req.query.perturbagen;

  const query = `Select substrate, cell_line, fold_change, p_value, cv from Observation where perturbagen = ? and fold_change <> -888 and p_value <> -888 order by cell_line, substrate`;
  db.all(query, [perturbagen], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getObservationPerturbagenCellLine', (req, res) => {
  const perturbagen = req.query.perturbagen;
  const cell_line = req.query.cell_line;

  const query = `select substrate, fold_change, p_value from observation where perturbagen = ? and cell_line = ?`;
  db.all(query, [perturbagen, cell_line], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getKnownPerturbagens/', (req, res) => {
  const kinase = req.query.kinase;

  const query = `select perturbagen, source, score from PK_relationship where kinase = ? order by perturbagen`;
  db.all(query, [kinase], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

router.get('/api/getKnownSubstrates', (req, res) => {
  const KPa = req.query.KPa;

  const query = `select PsT, sources from known_target where KPa = ? order by PsT`;
  db.all(query, [KPa], (err, rows) => {
    if (err) throw err;
    res.send(rows);
  });
});

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

router.get('/api/pathway', (req, res) => {
  (async () => {
    const fileData = await fs.readFile('../toydata.csv');
    parse(fileData, { columns: true, trim: true }, (err, csvData) => {
      if (err) throw err;
      const pathwayData = parseCSVToPaths(csvData);
      res.send(pathwayData);
    });
  })();
});

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});

/////////////////////////////////////////
/////////////PROLOG//////////////////////
/////////////////////////////////////////
