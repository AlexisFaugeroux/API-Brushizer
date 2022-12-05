import express from 'express';

import artworkRouter from './artwork.js';
import authenticationRouter from './authentication.js';

const router = express.Router();

router.use('/artworks', artworkRouter);
router.use('/authentication', authenticationRouter);

export default router;
