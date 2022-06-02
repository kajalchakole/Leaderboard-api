const Agent = require('../models/Agent');
const AgentCallDetails = require('../models/AgentCallDetails');

module.exports = class TopPerformersService {
    static async getTopPerformers({field, limit}) {
        try {
            let param = "-"+field;
            const records = await Agent.find().sort(param).limit(limit); 
            return records;
        } catch (error) {
            throw new Error(error);
        }
    }
}