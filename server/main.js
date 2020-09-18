import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import publicRouter from './routes/public';
import webRouter from './routes/web';
import path from 'path';

// Connect to the DB
export const db = new sqlite3.Database('../chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to ChemphoproDB');
});

export const app = express();

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', publicRouter);
app.use('/apiWeb', webRouter);

// Catch all for deploy
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function (err) {
    if (err) res.status(500).send(err);
  });
});
