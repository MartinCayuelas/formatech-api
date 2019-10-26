const express = require('express');
const router = express();

// Routes
const home = require('./home');
router.use('/accueil', home);

module.exports = router;
