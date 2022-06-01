const AgentIncentives = require('../models/AgentIncentives');
const AgentService = require('./agentService');

module.exports = class AgentIncentivesService {
    static async getAgentIncentives(id) {
        try {
            return await AgentIncentives.find({empId: id});
        } catch (error) {
            throw new Error(error);
        } 
    }

    static async addAgentIncentives(id, {incentives}) {
        try {
            const record = await this.getAgentIncentives(id);
            if(record.length > 0){
                let totalncentivesEarned = incentives + record[0].totalncentivesEarned;
                const result = await AgentIncentives.findOneAndUpdate({agentId: record[0].id}, 
                    {totalncentivesEarned});
                return result;
            }else {
                const agent = await AgentService.getAgentById(id);
                if(agent){
                    const result = await AgentIncentives.create({agentId: agent.id, empId: agent.empId, totalncentivesEarned: incentives});
                    return  result;
                }
                else   
                    throw new Error("Agent Not Found!");
            }
        } catch (error) {
            throw new Error(error);
        }
    }
}