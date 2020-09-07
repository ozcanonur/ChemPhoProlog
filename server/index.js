const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const parse = require('csv-parse');
const fs = require('fs').promises;
const _ = require('lodash');

const prolog = require('tau-prolog');
const { parseCSVToPaths } = require('./pathwayParser');

const router = express();
const port = process.env.PORT || 5000;

path = require('path');

router.use(express.static('../client/build'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
// Handles promise rejects, similar to try/catch but fancier
// const handleError = (fn) => (...params) => fn(...params).catch(console.error);

// const session = prolog.create();

// const askQuery = (query) => {
//   return new Promise((resolve, reject) => {
//     session.query(query, {
//       success: () => {
//         resolve();
//       },
//       error: (err) => {
//         reject(new Error(err));
//       },
//     });
//   });
// };

// const getAnswer = () => {
//   return new Promise((resolve, reject) => {
//     session.answer({
//       success: (answer) => {
//         resolve(answer);
//       },
//       error: (err) => {
//         reject(new Error(err));
//       },
//       fail: () => {
//         reject(new Error('Get answer failed'));
//       },
//       limit: () => {
//         reject(new Error('Limit exceeded'));
//       },
//     });
//   });
// };

// const consultFile = (file) => {
//   return new Promise((resolve, reject) => {
//     session.consult(file, {
//       success: () => {
//         resolve();
//       },
//       error: (err) => {
//         reject(new Error(err));
//       },
//     });
//   });
// };

// const asyncForEach = async (array, callback) => {
//   for (let i = 0; i < array.length; i += 1) {
//     await callback(array[i], i, array);
//   }
// };

// const consultFiles = async (files) => {
//   await asyncForEach(files, async (file) => {
//     await consultFile(file);
//   });
// };

// const files = [
//   './facts/expressed_in.pl',
//   './facts/kinases.pl',
//   './facts/knowninhibitor.pl',
//   './facts/knownsign_all.pl',
//   './facts/knownsign_uniq.pl',
//   './facts/knowntarget_all.pl',
//   './facts/knowntarget_INmtor.pl',
//   './facts/perturbs_MCF7_INmtor.pl',
//   './facts/phosphatases.pl',

//   './facts/segmentaa.pl',
//   './facts/segmentab.pl',
//   './facts/segmentac.pl',
//   './facts/segmentad.pl',
// ];

// const query = "findall(X, expressedin(X, 'MCF7'), List).";

// if (typeof localStorage === 'undefined' || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('./scratch');
// }

// handleError(async () => {
//   console.log(typeof localStorage.getItem('prologSession'));
//   console.time('consult');
//   await consultFiles(files);
//   console.timeEnd('consult');
//   console.log(session);
//   localStorage.setItem('prologSession', JSON.stringify(session));
//   console.log(JSON.parse(localStorage.getItem('prologSession')));
// })();

// handleError(async () => {
//   await consultFiles(files);
//   await askQuery(query);
//   const answer = await getAnswer();
//   console.log(prolog.format_answer(answer));
// })();
