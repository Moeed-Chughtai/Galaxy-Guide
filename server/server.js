import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import axios from 'axios';
import { ExtractPlanetData } from './data.js';
import { Planet } from './models/planet.js';

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
        const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${planet}`);
        const data = ExtractPlanetData(response.data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching planet data:', error);
        res.status(500).send('Error fetching planet data');
    }
});


app.post('/api/:planet', async (req, res) => {
    const planetName = req.params.planet;
    try {
        let planet = await Planet.findOne({ name: planetName });

        if (!planet) {
            const response = await axios.get(`https://api.le-systeme-solaire.net/rest/bodies/${planetName}`);
            const planetData = ExtractPlanetData(response.data);

            planet = new Planet(planetData);
            await planet.save();
        }
        res.json(planet);
    } catch (error) {
        console.error('Error fetching planet data:', error);
        res.status(500).send('Error fetching planet data');
    }
});

app.get('/planets', async (req, res) => {
    try {
        const planets = await Planet.find();
        res.json(planets);
    } catch (error) {
        console.error('Error fetching planets:', error);
        res.status(500).send('Error fetching planets');
    }
});

app.post('/score/:name', async (req, res) => {
    const name = req.params.name;
    const score = req.body.score;

    try {
        let existingScore = await Score.findOne({ name });

        if (existingScore) {
            existingScore.score += 1;
            await existingScore.save();
            res.json(existingScore);
        } else {
            const newScore = new Score({ name, score });
            await newScore.save();
            res.json(newScore);
        }
    } catch (error) {
        console.error('Error saving/updating score:', error);
        res.status(500).send('Error saving/updating score');
    }
});


// Top 5
app.get('/score', async (req, res) => {
    try {
        const scores = await Score.find().sort({ score: -1 }).limit(5);
        res.json(scores);
    } catch (error) {
        console.error('Error fetching scores:', error);
        res.status(500).send('Error fetching scores');
    }
});