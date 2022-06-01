const AgentIncentives = require('../models/AgentIncentives');
const AgentService = require('./AgentService');
const mongoose = require('mongoose');

module.exports = class AgentIncentivesService {
    static async getAgentIncentives(empId) {
        try {
            return await AgentIncentives.find({ empId });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async addAgentIncentives(empId, { incentives }, session) {
        if (!session) {
            session = await mongoose.startSession();
        }

        try {
            const record = await this.getAgentIncentives(empId);
            if (record.length > 0) {
                let totalncentivesEarned = incentives + record[0].totalncentivesEarned;
                const result = await AgentIncentives.findOneAndUpdate({ id: record[0].id },
                    { totalncentivesEarned }, { session });
                return result;
            } else {
                const agent = await AgentService.getAgentById(empId);
                if (agent) {
                    const result = await AgentIncentives.create([{ agentId: agent.id, empId: agent.empId, totalncentivesEarned: incentives }],
                        { session });
                    return result;
                }
                else
                    throw new Error("Agent Not Found!");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}