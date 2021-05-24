import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// import fs from 'fs';
// import https from 'https';

import { config } from '../config/index';
import getRoutes from './routes';

// const privateKey = fs.readFileSync(
//   'C:/Users/migue/Documents/certs/privateKey.key'
// );
// const certificate = fs.readFileSync(
//   'C:/Users/migue/Documents/certs/certificate.crt'
// );

// initialization
// const credentials = { key: privateKey, cert: certificate };
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
// routes
app.use('/api', getRoutes());

// https.createServer(credentials, app).listen(config.port, () => {
//   console.log(`Server running on https://localhost:${config.port}`);
// });

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
