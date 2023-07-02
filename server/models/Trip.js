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
    description: {
        type: String,
        required: true,
    },
    cost: {
        type: Number,
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
            type: String,
        }
    ],
});

const Trip = model('Trip', tripSchema);

export default Trip;
