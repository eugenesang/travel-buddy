const mongoose = require('mongoose');

const tripReviewSchema = new mongoose.Schema({
    destination: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip"
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    comment: {
        type: String
    }
}, {
    timestamps: true
});

const TripReview = mongoose.model("TripReview", tripReviewSchema);

module.exports = TripReview;