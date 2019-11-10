import express from 'express';
const router = express();

import homeRoute from './home';
import igRoute from './ig';
import doRoute from './do';
import contactRoute from './contact';
import userRoute from './user';
import sagesseRoute from './sagesse';

// Routes
router.use('/accueil', homeRoute);
router.use('/ig', igRoute);
router.use('/do', doRoute);
router.use('/contact', contactRoute);
router.use('/utilisateur', userRoute);
router.use('/sagesse', sagesseRoute);

export default router;
