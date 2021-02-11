const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    buses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }],
    roles: ['Admin', 'Operator'],
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;