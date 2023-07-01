import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    trips: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Trip',
        },
    ],
});

// Hash password before saving to the database
userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await genSalt(10);
        this.password = await hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password with the stored hash
userSchema.methods.comparePassword = async function (password) {
    return compare(password, this.password);
};

const User = model('User', userSchema);

export default User;
