const mongoose = require('mongoose');
const validator =  require('validator');
var Schema = mongoose.Schema;

const Agent = new mongoose.Schema({

    empId: {
        type: Number,
        required: true,
        unique: true
    },
    lastName: {
        type: String
    },
    firstName: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        min : 7000000000,
        max : 9999999999 //assuming we are not putting country code
    },
    workEmail: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is not a valid Email'
        }
    },
    designation: {
        type: String
    },
    reportingManager: {
        type: Schema.Types.ObjectId,
        ref: 'empId',
        required: false
    },
    location: {
        type: String
    },
    active: {
        type: Boolean
    },
    totalIncentivesEarned: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model("Agent", Agent);
