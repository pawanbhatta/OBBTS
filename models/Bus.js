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
    type: {
        type: String,
        required: true
    },
    numOfSeats: {
        type: Number,
        required: true
    },
    operator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;