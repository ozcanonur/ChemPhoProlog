const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const router = express();
const port = process.env.PORT || 5000;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.listen(port, () => console.log(`Listening on port ${port}`));

// Connect to the DB
const db = new sqlite3.Database('./chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to ChemphoproDB');
});

// Kinase List API end-point
router.get('/api/api/', (req, res) => {
  const queryString = req.query.query;

  db.all(queryString, [], (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

// Kinase List API end-point
router.get('/api/substrates_for_protein/', (req, res) => {
  const protein = req.query.protein;

  const reported_substrate_of_query =
    `select location, residue, detected_in, reported_substrate_of, ` +
    `reported_pdt_of from substrates_detailed where gene_name = "${protein}"`;

  db.all(reported_substrate_of_query, [], (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});

//const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;

// const url = 'mongodb://localhost:27017/';

// MongoClient.connect(url, (err, db) => {
//   if (err) throw err;
//   console.log('Connected to Mongo');
//   const chemphoprologDB = db.db('chemphoprolog');

//   const query = { kinase: 'AKT1' };
//   chemphoprologDB.collection('KS_relationship').find(query, function (err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });
