const mongoose = require('mongoose');
const { default: UserModel } = require('./userModel');

const userSessionSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    sessionToken: {
        type: String,
        default: null
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    createdTs: {
        type: Date,
        default: new Date(),
    },
    updatedTs: {
        type: Date,
        default: new Date(),
    }
});

const UserSessionModel = mongoose.model('userSession', userSessionSchema);

module.exports = UserSessionModel;