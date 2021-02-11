const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Passenger = mongoose.model('Passenger', passengerSchema);

module.exports = Passenger;