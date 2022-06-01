const express = require('express');
const AgentCallDetailsController = require('../controllers/AgentCallDetailsController');
const router = express.Router();

router.get('/:id', AgentCallDetailsController.getAgentCallDetails);
router.post('/:id', AgentCallDetailsController.addCallDetails);
router.patch('/:id', AgentCallDetailsController.updateCallDetails);

module.exports = router;