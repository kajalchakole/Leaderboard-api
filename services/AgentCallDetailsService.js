const AgentCallDetails = require('../models/AgentCallDetails');
const AgentService = require('./AgentService');

module.exports = class AgentCallDetailsService {
    static async getAgentCallDetails(id) {
        try {
            return await AgentCallDetails.find({ empId: id });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async addCallDetails(empId, data) {
        try {
            let agent = await AgentService.getAgentById(empId);
            if (agent) {
                let { category, createdAt, clientId, activityStatus, meetingId, incentives } = data;
                return await AgentCallDetails.create({ empId, category, createdAt, clientId, activityStatus, meetingId, incentives, agentId: agent.id });
            }
            else
                throw new Error("Agent Not Found!");
        } catch (error) {
            throw new Error(error);
        }
    }
    static async updateCallDetails(empId, data) {
        try {
            let agent = await AgentService.getAgentById(empId);
            if (agent) {
                let { activityStatus, meetingId, incentives, id, updatedAt } = data;
                AgentCallDetails.findOneAndUpdate( {_id: id}, 
                    { activityStatus, meetingId, incentives, updatedAt }, function (err, doc) {
                    if (err) 
                        throw new Error(error);
                    return doc;
                  });
            }
            else
                throw new Error("Agent Not Found!");
        } catch (error) {
            throw new Error(error);
        }
    }
}