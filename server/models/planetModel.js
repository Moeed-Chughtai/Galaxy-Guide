import moongose from 'mongoose';

const planetSchema = new moongose.Schema(
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

export const Planet = moongose.model('Planet', planetSchema);
