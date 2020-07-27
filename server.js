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
  let queryString = req.query.query;

  db.all(queryString, [], (err, rows) => {
    if (err) throw err;

    res.send(rows);
  });
});
