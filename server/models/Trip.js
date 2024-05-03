import { Schema, model } from 'mongoose';
import Invitation from './Invitation.js';

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
    totalDays: {
        type: Number,
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

tripSchema.pre('save', function(next){
    if(this.invitations.length > 0){
        for(let email of this.invitations){
            const invitation= new Invitation({
                sender: this.createdBy,
                tripId: this._id,
                recipient: email,
                message: `invitation to ${this.name}`
            });
            invitation.save();
        }
    }
    next();
})

const Trip = model('Trip', tripSchema);

export default Trip;
