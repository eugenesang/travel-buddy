import Destination from "../models/destination.js"

export async function create(req, res){
    const {title, location, description, img} = req.body;

    try {
        const destination =  new Destination({
            title, description, location, img
        });

        await destination.save();

        res.json(destination);
    } catch (error) {
        res.status(500).json({error});
    }
}

export async function getAll(req, res){
    try {
        const destinations = await Destination.find();

        return res.json(destinations);
    } catch (error) {
        res.status(500).json({error});
    }
}

export async function createMany(req, res){
    const destinations = req.body.destinations;

    res.json({
        message: "upload commenced"
    })

    for(let d of destinations){
       try {
        const destination = new Destination(d);

        await destination.save();
       } catch (error) {
        console.error(error);
       }
    }
}