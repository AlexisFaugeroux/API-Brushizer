import express, { NextFunction, Request } from 'express';
import logger from '../helpers/logger.ts';
import adminRouter from './admin.ts';
import artworkRouter from './artwork.ts';
import collectionRouter from './collection.ts';
import roleRouter from './role.ts';
import userRouter from './user.ts';
import errorHandlerFactory from '../middlewares/errorHandler.ts';
import Error404 from '../helpers/error404.ts';

const router = express.Router();

router.use((req: Request, _, next: NextFunction) => {
    logger.info(`API : ${req.url}`);
    next();
});

router.use('/admin', adminRouter);
router.use('/artworks', artworkRouter);
router.use('/collections', collectionRouter);
router.use('/roles', roleRouter);
router.use('/users', userRouter);

// Error 404 handler middleware
router.use((_, __, next: NextFunction) => {
    next(new Error404('API route not found'));
});

// Express error handler middleware with 4 parameters
router.use(errorHandlerFactory('json'));

export default router;
