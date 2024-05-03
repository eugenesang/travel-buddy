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

destinationSchema.index({
    title: "text",
    description: "text",
    location: "text"
})

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;