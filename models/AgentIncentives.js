const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Agent = require('./Agent');

var AgentIncentives = new mongoose.Schema({
    agentId : {
        type: Schema.Types.ObjectId,
        ref: "Agent",
        required: true
    },
    empId : {
        type: Number,
        required: true
    },
    totalncentivesEarned: {
        type: Number
    }
});
module.exports = mongoose.model("AgentIncentives", AgentIncentives);