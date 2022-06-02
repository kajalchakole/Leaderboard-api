const AgentIncentives = require('../models/AgentIncentives');
const AgentService = require('./AgentService');
const AgentCallDetails = require('../models/AgentCallDetails');
const Agent = require('../models/Agent');
const mongoose = require('mongoose');

module.exports = class AgentIncentivesService {
    static async getAgentIncentives(empId) {
        try {
            //TODO get incentives from AgentCallDetails Table
            return await Agent.find({ empId });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async addAgentIncentives(empId, { incentives }, session) {
        if (!session) {
            session = await mongoose.startSession();
        }

        try {
            const agent = await AgentService.getAgentById(empId);
            if (agent) {
                let totalIncentivesEarned = incentives + (agent.totalIncentivesEarned === undefined ? 0 : agent.totalIncentivesEarned);
                const result = await Agent.findOneAndUpdate({ agentId: agent.id, empId: agent.empId}, {totalIncentivesEarned },
                    { session });
                return result;
            }
            else
                throw new Error("Agent Not Found!");
        } catch (error) {
            throw new Error(error);
        }
    }

    static async calculateAllIncentives() {
        try {
            const records = await AgentCallDetails.aggregate([
                {
                    $group: {
                        "_id": "$empId",
                        totalIncentivesEarned: { $sum: "$incentives" }
                    }
                },
                {
                    $sort:
                    {
                        totalIncentivesEarned: -1
                    }
                }
            ]);
            

            for (let index = 0; index < records.length; index++) {
                const callDetail = records[index];
                const result = await Agent.findOneAndUpdate({ empId: callDetail._id }, {totalIncentivesEarned: callDetail.totalIncentivesEarned });
            }
            return records;

        } catch (error) {
            throw new Error(error);
        }
    }
}