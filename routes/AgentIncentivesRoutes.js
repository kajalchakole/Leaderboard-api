const AgentIncentivesController = require('../controllers/AgentIncentivesController');
const express = require('express');
const router = express.Router();

router.get('/:id', AgentIncentivesController.getAgentIncentives);
router.post('/:id', AgentIncentivesController.addAgentIncentives);
module.exports = router;