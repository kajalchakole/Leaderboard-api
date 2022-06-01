const Agent = require('../models/Agent');
const AgentCallDetails = require('../models/AgentCallDetails');
const AgentService = require('./AgentService');
const AgentIncentivesService = require('./AgentIncentivesService');
const mongoose = require('mongoose');

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
        await mongoose.startSession().then(async (session) => {
            session.startTransaction();
            try {
                let agent = await AgentService.getAgentById(empId);
                if (agent) {
                    let { activityStatus, meetingId, incentives, clientId, updatedAt } = data;
                    let result = await AgentCallDetails.findOneAndUpdate({ empId, clientId },
                        { activityStatus, meetingId, incentives, updatedAt }, { session })
                    if (result === null) {
                        throw new Error("Agent call details not Found!");
                    }
                    if (activityStatus === 'Complete') {
                        AgentIncentivesService.addAgentIncentives(empId, { incentives }, session).then(() => {
                            this.commitTransactions(session, result);
                        });
                    }else 
                        this.commitTransactions(session, result);
                }
                else
                    throw new Error("Agent Not Found!");
            } catch (error) {
                session.abortTransaction().then(() => session.endSession());
                throw new Error(error);
            }
        });
    }

    static commitTransactions(session, result) {
        session.commitTransaction().then(() => {
            session.endSession();
            return result;
        }).catch(err => { throw err });
    }
}