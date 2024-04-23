const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    tripId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    active: {
        type: Boolean,
        default: true
    },
    expiry: {
        type: Date
    }, 
    status: {
        type: String,
        enum: ['accepted', 'rejected', 'pending'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Request =  mongoose.model("Request", requestSchema);

module.exports = Request;