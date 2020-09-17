import express from 'express';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import publicRouter from './routes/public';
import webRouter from './routes/web';

// Connect to the DB
export const db = new sqlite3.Database('../chemphopro.db', sqlite3.OPEN_READONLY, (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to ChemphoproDB');
});

const app = express();

app.use(express.static('../client/build'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', publicRouter);
app.use('/apiWeb', webRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
