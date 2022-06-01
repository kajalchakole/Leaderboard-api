const Agent = require('../models/Agent');

module.exports = class AgentService {
    static async getAllAgents() {
        try {
            return await Agent.find();;
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createAgent(data) {
        try {
            let { empId, firstName, lastName, mobile, workEmail, designation, reportingManager, location, active } = data;
            return await Agent.create({ empId, firstName, lastName, mobile, workEmail, designation, reportingManager, location, active });
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getAgentById(empId) {
        try {
            return await Agent.findOne({empId});
        } catch (error) {
            throw new Error(error);
        }
    }
}