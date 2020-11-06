import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env') });

import publicRouter from './routes/public';
import webRouter from './routes/web';

const app = express();

const clientBuildPath = path.join(__dirname, '../../client/build');

app.use(express.static(clientBuildPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: '*',
  })
);
app.use(compression());

app.use('/api', publicRouter);
app.use('/apiWeb', webRouter);

// Catch all for deploy
app.get('/*', function (_req, res) {
  res.sendFile(clientBuildPath + '/index.html', function (err) {
    if (err) res.status(500).send(err);
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
