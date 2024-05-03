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

export async function getById(req, res){
    try {
        const id = req.params.id;
        const destination = await Destination.findById(id);
        res.json(destination);
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Failed to get destination"})
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



async function recommendDestinations() {
    const randomDocs = await Destination.aggregate([{
        $sample: {size: 20}
    }])

    return randomDocs;
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
        const destinations = await Destination.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
        .sort({ score: { $meta: 'textScore' } })
        .limit(20); // Limit to 20 results

        res.status(200).json(destinations);
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

        res.status(200).json({user: account, destination:dest})
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"})
    }
}