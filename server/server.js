import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import axios from 'axios';
import { ExtractPlanetData } from './data.js';

const app = express();
app.use(express.json());

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to MongoDB...');
        app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
    })

    .catch(err => {
        console.log(err);
    });

app.get('/api/:planet', async (req, res) => {
    try {
        const planet = req.params.planet;
        const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${planet}/`);
        const data = ExtractPlanetData(response.data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching planet data:', error);
        res.status(500).send('Error fetching planet data');
    }
});
