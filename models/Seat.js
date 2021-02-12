const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seat: {
        type: String,
        required: true
    },
    avail: {
        type: Number,
        required: false
    },
    booked: {
        type: Number,
        required: false
    },
    avail: ['Y', 'N'], //Just added
}, { timestamps: true });

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;