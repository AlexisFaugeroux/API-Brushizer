import express from 'express';

import artworkRouter from './artwork.js';
import authenticationRouter from './authentication.js';

import errorHandlerFactory from '../helpers/errorHandler.js';
import Error404 from '../helpers/error404.js';

const router = express.Router();

router.use('/artworks', artworkRouter);
router.use('/authentication', authenticationRouter);

// Error 404 handler middleware
router.use((_, __, next) => {
    next(new Error404('API route not found'));
});

// Express error handler middleware with 4 parameters
router.use(errorHandlerFactory('json'));

export default router;
