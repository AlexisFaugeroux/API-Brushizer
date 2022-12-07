import express from 'express';

import artworkRouter from './artwork.js';
import roleRouter from './role.js';
import userRouter from './user.js';

import authenticationRouter from './authentication.js';

import errorHandlerFactory from '../middlewares/errorHandler.js';
import Error404 from '../helpers/error404.js';

const router = express.Router();

router.use('/login', authenticationRouter);

router.use('/artworks', artworkRouter);
router.use('/roles', roleRouter);
router.use('/users', userRouter);

// Error 404 handler middleware
router.use((_, __, next) => {
    next(new Error404('API route not found'));
});

// Express error handler middleware with 4 parameters
router.use(errorHandlerFactory('json'));

export default router;
