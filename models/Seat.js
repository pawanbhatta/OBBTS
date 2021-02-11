const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
    seat: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;