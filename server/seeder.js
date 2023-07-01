// seed.js

import User from './models/User.js';
import Trip from './models/Trip.js';

import connectDB from './config/db.js';

async function seedData() {
    try {
        // Create dummy users
        const user1 = await User.create({ name: 'John Doe', email: 'john@example.com', password: 'password1' });
        const user2 = await User.create({ name: 'Jane Smith', email: 'jane@example.com', password: 'password2' });

        // Create dummy trips
        const trip1 = await Trip.create({
            name: 'Trip to Paris',
            destination: 'Paris, France',
            startDate: new Date('2023-08-01'),
            endDate: new Date('2023-08-07'),
            createdBy: user1._id,
            invitations: [
                { invitedUser: user2._id, accepted: true },
            ],
        });

        const trip2 = await Trip.create({
            name: 'Beach Vacation',
            destination: 'Maldives',
            startDate: new Date('2023-09-15'),
            endDate: new Date('2023-09-22'),
            createdBy: user2._id,
            invitations: [
                { invitedUser: user1._id, accepted: false },
            ],
        });

        console.log('Dummy data seeded successfully!');
    } catch (error) {
        console.error('Failed to seed dummy data:', error);
    } finally {
        process.exit(0);
    }
}

connectDB();
seedData();
