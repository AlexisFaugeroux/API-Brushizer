import './app/helpers/loadEnv.js';
import http from 'http';
import debug from 'debug';
import app from './app/app.js';

const debugServer = debug('Server');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    debugServer(`Server is launched at http://localhost:${PORT}, (${process.env.NODE_ENV})`);
});
