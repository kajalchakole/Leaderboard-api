const TopPerformersService = require('../services/TopPerformersService');

module.exports = class TopPerformerController {
    static async getTopPerformers(req, res) {
        try {
            const result = await TopPerformersService.getTopPerformers(req.body);
            res.send(result);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}