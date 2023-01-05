import './app/helpers/loadEnv.js';
import http from 'http';
import debug from 'debug';
import app from './app/app.js';
import logger from './app/helpers/logger.js';

const debugServer = debug('Server');

process.on('unhandledRejection', (err) => {
    throw err;
});

process.on('uncaughtException', (err) => {
    logger.fatal('uncaughtException', err);
    process.exit(1);
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    debugServer(`Server is launched at http://localhost:${PORT}, (${process.env.NODE_ENV})`);
    logger.info(`Server is launched at http://localhost:${PORT}, (${process.env.NODE_ENV})`);
});
