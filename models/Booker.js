const mongoose = require('mongoose');

const BookerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    },
    seats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Seat'
    }],
    passengers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Passenger'
    }],
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, { timestamps: true });

const Booker = mongoose.model('Booker', BookerSchema);

module.exports = Booker;