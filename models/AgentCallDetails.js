const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Agent = require('./Agent');
const Client = require('./Client');

const AgentCallDetails = mongoose.Schema({
    category: {
        type: String
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    empId: {
        type: Number,
        required: true
    },
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    activityStatus: {
        type: String,
        required: true
    },
    meetingId: {
        type: Schema.Types.ObjectId,
        ref: 'MeetingDetails',
    },
    incentives: {
        type: Number
    }    
});

module.exports = mongoose.model('AgentCallDetails', AgentCallDetails);