const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

// Connect to the DB
const db = new sqlite3.Database('../chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to ChemphoproDB');
});

module.exports = db;

const app = express();

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('./routes/index'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

/////////////////////////////////////////
/////////////PROLOG//////////////////////
/////////////////////////////////////////
