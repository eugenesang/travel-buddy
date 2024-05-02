import Destination from "../models/destination.js"
import User from "../models/User.js";

export async function create(req, res) {
    const { title, location, description, img } = req.body;

    try {
        const isDuplicate = await Destination.findOne({ title, location });

        if (isDuplicate) {
            return res.status(400).json({
                error: "Duplicate file",
                original: isDuplicate
            })
        }

        const destination = new Destination({
            title, description, location, img
        });

        await destination.save();

        res.json(destination);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getAll(req, res) {
    try {
        const destinations = await Destination.find();

        return res.json(destinations);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function createMany(req, res) {
    const destinations = req.body.destinations;

    res.json({
        message: "upload commenced"
    })

    for (let d of destinations) {
        try {
            const isDuplicate = await Destination.findOne({ title: d.title, location: d.location });

            if (isDuplicate) {
                console.log({
                    error: "Duplicate file",
                    original: isDuplicate
                });
                continue;
            }
            const destination = new Destination(d);

            await destination.save();
        } catch (error) {
            console.error(error);
        }
    }
}

async function getRandomDestination() {
    const randomDestination = await Destination.aggregate([
        { $sample: { size: 1 } } // Retrieve one random document
    ]); // Selects 1 random document
    return randomDestination[0]; // Get the first element from the returned array
}

async function findSimilarLocation(location) {
    const similarLocations = await Destination.find({ location: { $regex: location, $options: 'i' } })
        .limit(5);
    return similarLocations;
}

async function findSimilarDescription(description) {
    const keywords = [...new Set(description.split(" "))]; // Split description into keywords
    const regex = new RegExp(keywords.join('|'), 'gi'); // Case-insensitive search for any keyword

    const similarDescriptions = await Destination.find({ description: { $regex: regex } })
        .limit(9);
    return similarDescriptions;
}

async function findSimilarTitle(title){
    const keywords = title.split(/\s+/); // Split description into keywords
    const regex = new RegExp(keywords.join('|'), 'gi'); // Case-insensitive search for any keyword

    const similarTitle = await Destination.find({ description: { $regex: regex } })
        .limit(9);
    return similarTitle;
}

async function recommendDestinations() {
    const randomDest = await getRandomDestination();
    const similarLocation = await findSimilarLocation(randomDest.location);
    const similarDescription = await findSimilarDescription(randomDest.description);
    const similarTitle = await findSimilarTitle(randomDest.title)


    return [
        randomDest, ...similarDescription, ...similarLocation, ...similarTitle
    ]
}

export async function explore(req, res) {
    try {
        const data = await recommendDestinations();
        
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "" })
    }
}

// Controller function for searching destinations
export const searchDestinations = async (req, res) => {
    try {
        const query = req.query.q; // Get the search query from request query parameters
        if (!query) {
            return res.status(400).json({ message: 'Search query is required' });
        }

        // Search destinations based on title or description containing the query string
        const destinations = await Destination.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }, // Case-insensitive regex search for title
                { description: { $regex: query, $options: 'i' } }, // Case-insensitive regex search for description
            ]
        })
            .limit(20); // Limit to 20 results

        res.status(200).json({ destinations });
    } catch (error) {
        console.error('Error searching destinations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export async function like(req, res){
    try {
        const {destination, user} = req.query;

        const account = await User.findById(user);
        const isLiked = account.likedDestinations.map(d=>d.toString()).includes(destination);

        const dest = await Destination.findById(destination);
        
        if(isLiked){
            dest.likes -=1;
            account.likedDestinations = account.likedDestinations.filter(likedDest => likedDest.toString() !== destination);
        }else{
            dest.likes +=1;
            account.likedDestinations.push(destination);
        }

        await dest.save();
        await account.save();

        res.status(200).json({user: account, destination: dest})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}