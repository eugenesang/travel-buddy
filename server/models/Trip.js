import { Schema, model } from 'mongoose';

const tripSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    invitations: [
        {
            invitedUser: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            accepted: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

const Trip = model('Trip', tripSchema);

export default Trip;
