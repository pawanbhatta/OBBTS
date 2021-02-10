const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNo: {
        type: String,
        required: true
    },
    busName: {
        type: String,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    arrival: {
        type: Date,
        required: true
    },
    depart: {
        type: Date,
        required: true
    },
}, { timestamps: true });

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;