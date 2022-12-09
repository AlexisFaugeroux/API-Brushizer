import express from 'express';
import cors from 'cors';
import router from './routers/index.js';

const app = express();

app.use(express.json());

app.use(cors(process.env.CORS_DOMAINS ?? '*'));

app.use(router);

export default app;
