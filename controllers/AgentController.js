const AgentService = require('../services/AgentService');
module.exports = class AgentController {
    static async getAllAgents(req, res) {
        try {
            const records = await AgentService.getAllAgents()
            if (records.length === 0)
                res.status(404);
            else
                res.send(records);
        } catch (error) {
            res.status(500).send({ error });
        };
    }

    static async createAgent(req, res) {
        try {
            const newAgent = await AgentService.createAgent(req.body);
            res.send(newAgent);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}