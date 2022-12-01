import './app/helpers/loadEnv.js';
import http from 'http';
import app from './app/app.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is launched http://localhost:${PORT}, (${process.env.NODE_ENV})`);
});
