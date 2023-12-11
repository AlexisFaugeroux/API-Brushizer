import bunyan from 'bunyan';
import * as url from 'url';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));

const logger = bunyan.createLogger({
    name: 'Brushizer Backend',
    streams: [
        {
            stream: process.stdout,
            level: 'error',
        },
        {
            type: 'rotating-file',
            path: `${dirname}../../logs/all.log`,
            level: 'info',
            period: '1w',
            count: 1,
        },
        {
            type: 'rotating-file',
            path: `${dirname}../../logs/error.log`,
            level: 'error',
            period: '1d',
            count: 3,
        },
    ],
});

export default logger;
