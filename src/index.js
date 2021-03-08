import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { config } from '../config/index';
import getRoutes from './routes';

// initialization
const app = express();

// middlewares
app.use(morgan('dev'));
app.use(express.json());
// app.use(cors({ origin: config.cors, optionsSuccessStatus: 200 }));
app.use(cors());

// routes
app.use('/api', getRoutes());

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
