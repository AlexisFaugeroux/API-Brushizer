import express, { Application } from 'express';
import cors from 'cors';
import router from './routers/index.ts';

const app: Application = express();

app.use(express.json());

const options: cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: process.env.CORS_DOMAINS,
    preflightContinue: false,
};

app.use(cors(options));

app.use(router);

export default app;
