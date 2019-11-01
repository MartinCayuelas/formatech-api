import express from 'express';
const router = express();

import homeRoute from './home';
import igRoute from './ig';
import doRoute from './do';
import contactRoute from './contact';
import sagesseRouter from './sagesse';

// Routes
router.use('/accueil', homeRoute);
router.use('/ig', igRoute);
router.use('/do', doRoute);
router.use('/contact', contactRoute);
router.use('/sagesse', sagesseRouter);

export default router;
