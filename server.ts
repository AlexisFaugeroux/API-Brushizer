import './src/helpers/loadEnv.ts';
import http from 'http';
import debug from 'debug';
import app from './src/app.ts';
import logger from './src/helpers/logger.ts';

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
    debugServer(
        `Server is launched at http://localhost:${PORT}, (${process.env.NODE_ENV})`,
    );
    logger.info(
        `Server is launched at http://localhost:${PORT}, (${process.env.NODE_ENV})`,
    );
});
