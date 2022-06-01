const AgentCallDetailsService = require('../services/AgentCallDetailsService');

module.exports = class AgentCallDetailsController {
    static async getAgentCallDetails(req, res) {
        try {
            const record = await AgentCallDetailsService.getAgentCallDetails(req.params.id);
            if (record.length === 0)
                res.send(404);
            else
                res.send(record);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
    static async addCallDetails(req, res) {
        try {
            await AgentCallDetailsService.addCallDetails(req.params.id, req.body);
            res.status(200).send(`Call details added for agent ${req.params.id}`)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    static async updateCallDetails(req, res) {
        try {
            await AgentCallDetailsService.updateCallDetails(req.params.id, req.body);
            res.status(200).send(`Call details added for agent ${req.params.id}`)
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}