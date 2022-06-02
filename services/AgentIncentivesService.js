const AgentIncentives = require('../models/AgentIncentives');
const AgentService = require('./AgentService');
const AgentCallDetails = require('../models/AgentCallDetails');
const Agent = require('../models/Agent');
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
            const records = await Agent.aggregate([{
                $lookup: {
                    from: 'agentcalldetails',
                    localField: 'empId',
                    foreignField: 'empId',
                    as: 'agent_calls'
                }
            },{   $unwind:"$agent_calls" },
            {
                $project: {
                    _id: 1,
                    empId: 1,
                    incentives: "$agent_calls.incentives",
                    totalIncentivesEarned: 1
                }
            }
            ]);
            await Agent.updateMany({}, {totalIncentivesEarned: 0});

            for (let index = 0; index < records.length; index++) {
                const callDetail = records[index];
                let totalIncentivesEarned = callDetail.incentives + (callDetail.totalIncentivesEarned === undefined ? 0 : callDetail.totalIncentivesEarned);
                const result = await Agent.findOneAndUpdate({ agentId: callDetail.id, empId: callDetail.empId}, {totalIncentivesEarned });
            }
            return records;

        } catch (error) {
            throw new Error(error);
        }
    }
}