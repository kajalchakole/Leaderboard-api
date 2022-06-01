const express = require('express');
const router = express.Router();
const AgentController = require('../controllers/agentController');

router.get('/', AgentController.getAllAgents);

router.post('/', AgentController.createAgent);

module.exports = router;