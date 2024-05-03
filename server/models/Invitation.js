import mongoose from "mongoose";

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
        type: String,
    
    },
    active: {
        type: Boolean,
        default: true
    },
    expiry: {
        type: Date
    },
    message: {
        type: String
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

export default Invitation