const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
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

const Invitation =  mongoose.model("Invitation", invitationSchema);

module.exports = Invitation;