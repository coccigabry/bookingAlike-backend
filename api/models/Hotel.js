import mongoose from 'mongoose';


const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    accomodation: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    distanceCityCenter: {
        type: String,
        reuired: true
    },
    photos: {
        type: [String]
    },
    title: {
        type: String,
        required: true
    },
    descr: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String]
    },
    cheapestPrice: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Hotel", HotelSchema);