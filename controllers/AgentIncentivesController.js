const AgentIncentivesService = require('../services/AgentIncentivesService');

module.exports = class AgentIncentivesController {
    static async getAgentIncentives(req, res) {
        try {
            const record = await AgentIncentivesService.getAgentIncentives(req.params.id);
            if (record.length === 0)
                res.send(404);
            else
                res.send(record);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async addAgentIncentives(req, res) {
        try {
            const result = await AgentIncentivesService.addAgentIncentives(req.params.id, req.body);
            res.status(200).send(`Incentives updated for agent ${req.params.id}`)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}