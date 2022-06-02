const express = require('express');
const TopPerformerController = require('../controllers/TopPerformersController');
const router = express.Router();

router.get('/', TopPerformerController.getTopPerformers);

module.exports = router;