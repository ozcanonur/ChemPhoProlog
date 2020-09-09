const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Connect to the DB
const db = new sqlite3.Database('../chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to ChemphoproDB');
});

module.exports = db;

const router = express();

router.use(express.static('../client/build'));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use(require('./routes'));

const port = process.env.PORT || 5000;
router.listen(port, () => console.log(`Listening on port ${port}`));

/////////////////////////////////////////
/////////////PROLOG//////////////////////
/////////////////////////////////////////
