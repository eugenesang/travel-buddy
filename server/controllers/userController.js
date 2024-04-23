// userController.js
import User from '../models/User.js';

// Register a new user
export async function registerUser(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        console.log(`Created user: ${user._id} at ${user.createdAt}`);
        res.status(201).json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
        console.error(error);
    }
}

// Login user
export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await user?.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to login' });
    }
}

// Update user profile
export async function updateUserProfile(req, res) {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { name, email },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update user profile' });
    }
}

//Update one by one

export async function updateName(req, res){
    try {
        const {name, id} = req.body;

        const user = await User.findByIdAndUpdate(id, {name}, {new: true});

        if(!user){
            return res.status(404).json({error: "User not found"})
        };

        return res.status(200).json({user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Failed to update user name"});
    } 
}

export async function updateAbout(req, res){
    try {
        const {about, id} = req.body;

        const user = await User.findByIdAndUpdate(id, {about}, {new: true});

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        return res.status(200).json({user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Failed to update user about"});
    }
}

export async function updateLocation(req, res){
    try {
        const {city, country, id} = req.body;

        const user = await User.findByIdAndUpdate(id, {"location.city": city, "location.country": country}, {new: true});

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        return res.status(200).json({user});
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "Failed to update user location"});
    }
}
