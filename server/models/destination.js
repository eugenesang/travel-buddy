import mongoose from "mongoose";

const destinationSchema =  new mongoose.Schema({
    title: String,
    description: String,
    img: String,
    location: String,
    visits: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    }
});

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;