const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const parse = require('csv-parse');
const fs = require('fs').promises;
const _ = require('lodash');

const router = express();
const port = process.env.PORT || 5000;

path = require('path');

router.use(express.static('../client/build'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.listen(port, () => console.log(`Listening on port ${port}`));

// Connect to the DB
const db = new sqlite3.Database('../chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
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

// Substrates for protein @kinasedetails/description
router.get('/api/substrates_for_protein/', (req, res) => {
  const protein = req.query.protein;

  const reported_substrate_of_query =
    `select distinct x.location, x.residue, x.detected_in, coalesce(y.PsT_effect, 'unknown') as pst_effect, ` +
    `x.reported_substrate_of, x.reported_pdt_of from ` +
    `(select gene_name, residue, location, detected_in, reported_substrate_of, reported_pdt_of ` +
    `from substrates_detailed where gene_name='${protein}') as x ` +
    `left join ` +
    `(select TProtein, PsT_effect, residue_type, residue_offset from known_sign where TProtein = '${protein}') as y ` +
    `on x.residue = y.residue_type and x.location = y.residue_offset`;

  db.all(reported_substrate_of_query, [], (err, rows) => {
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
    `(select * from KS_relationship where kinase='${kinase}' and source='PDT' and cell_line='${cell_line}' ` +
    `and confidence <> '0.0' and confidence <> '-1.0') as x ` +
    `left join ` +
    `(select * from KS_relationship where source='PDT' and cell_line='${cell_line}' and confidence <> '0.0' and confidence <> '-1.0') as y ` +
    `on x.substrate = y.substrate and x.kinase <> y.kinase group by x.substrate) as main ` +
    `left join substrate on main.substrate = substrate.substrate_id order by main.substrate`;

  db.all(query, [], (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

String.prototype.replaceAll = function (search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

const parseCSVToPaths = (csvData) => {
  let paths = []; // Legit paths Root > KPa > PsonKPa > KPa...
  let relations = {}; // KPa affects phosphosites
  let phosphosites = []; // Phosphosites that just EXIST
  let regulatory = {}; // Regulatory effect of phosphosites
  let stoppingReasons = {}; // Why we stopped

  csvData.forEach((row) => {
    let path = row.Path;
    path = path.substring(1, path.length - 1);
    path = path.split(/\[(.+?)\]/);

    let parsedPath = [];
    for (let i = 1; i < path.length - 1; i += 2) {
      let step = path[i].split(', ');
      step = step.map((e) => e.replaceAll("'", ''));

      const affected = step[0];
      const affecting = step[3];
      // If we are at the last node
      if (i === path.length - 2) {
        // na ending without KPa
        if (step[4] === 'na' && step[3] === 'na') {
          phosphosites.push(step[0]);
          regulatory[step[0]] = step[2];
          stoppingReasons[step[0]] = row.Explanation;
          parsedPath.push(step[0]);
          continue;
          // regular phosphosite ending
        } else if (step[4].includes('(')) {
          phosphosites.push(step[4]);
          regulatory[step[4]] = step[6];
          stoppingReasons[step[4]] = row.Explanation;
          //parsedPath.push(step[4])
        } else {
          stoppingReasons[step[3]] = row.Explanation;
        }
      }

      parsedPath.push(affected);
      parsedPath.push(affecting);
      // One off fix for regular phosphosite ending
      if (i === path.length - 2 && step[4].includes('(')) parsedPath.push(step[4]);

      if (!(affecting in relations)) relations[affecting] = [affected];
      else if (!relations[affecting].includes(affected)) relations[affecting].push(affected);
      regulatory[step[0]] = step[2];
    }
    paths.push(parsedPath);
  });

  // Combine all phosphosites (from relations and leftovers)
  phosphosites = _.union(phosphosites, Object.values(relations).flat());

  return { paths, relations, phosphosites, regulatory, stoppingReasons };
};

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
