const mongoose = require('mongoose');
const validator =  require('validator');

const Client = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: Number,
        min : 7000000000,
        max : 9999999999 //assuming we are not putting country code
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is not a valid Email'
        }
    },
    address: {
        type: String
    },
    city: {
        type: String
    }
});

module.exports = mongoose.model("Client", Client);