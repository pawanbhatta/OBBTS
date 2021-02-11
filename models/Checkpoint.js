const mongoose = require('mongoose');

const checkpointSchema = new mongoose.Schema({
    checkpoint: {
        type: String,
        required: true
    },
    busId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }
}, { timestamps: true });

const Checkpoint = mongoose.model('Checkpoint', checkpointSchema);

module.exports = Checkpoint;