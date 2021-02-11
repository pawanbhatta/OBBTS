const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    bus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    },
    booker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booker'
    },
}, { timestamps: true });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;