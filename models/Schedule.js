const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    },
    depart: {
        type: Date,
        required: true
    },
    arrival: {
        type: Date,
        required: true
    },
    pickup: {
        type: String,
        required: true
    },
    dropoff: {
        type: String,
        required: true
    },
    checkpoints: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checkpoint'
    }]
}, { timestamps: true });

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;