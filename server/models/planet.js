import mongoose from 'mongoose';

const planetSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        noOfMoons: {
            type: Number,
        },
        moons: {
            type: [String],
        },
        avgTemp: {
            type: Number,
        },
        mass: {
            type: Number,
        },
        meanRadius: {
            type: Number,
        },
        gravity: {
            type: Number,
        },
        density : {
            type: Number,
        }
    }
);

export const Planet = mongoose.model('Planet', planetSchema);
