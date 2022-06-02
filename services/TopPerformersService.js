const Agent = require('../models/Agent');
const AgentCallDetails = require('../models/AgentCallDetails');

module.exports = class TopPerformersService {
    static async getTopPerformers({ field="totalIncentives", limit=5 }) {
        try {
            let param = "-" + field;
            return await Agent.find().sort(param).limit(limit);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async getTopPerformersByCategory({ field }) {
        try {
            const records = await AgentCallDetails.aggregate([
                {
                    $group: {
                        _id: "$empId",
                        totalIncentives: { $sum: "$incentives" }
                    }
                },
                {
                    $sort:
                    {
                        totalIncentives: -1
                    }
                }
            ]);
            return records;
        } catch (error) {
            throw new Error(error);
        }
    }
}