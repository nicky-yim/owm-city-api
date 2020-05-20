require('dotenv').config();

const express = require('express');
const citiesStore = require('./cities-store');
const app = express();
const PORT = process.env.PORT || 3000;

const owm = require('./owm');
const sample = require('./sample.json');

citiesStore.build();

app.get('/test/', (req, res) => {
  res.send(sample);
});

app.get('/get/:lon/:lat', async (req, res) => {
  res.send(await owm.get(req.params.lon, req.params.lat));
});

app.get('/search/', (req, res) => {
  res.send([]);
});

app.get('/search/:query', (req, res) => {
  res.send(citiesStore.search(req.params.query));
});

app.get('*', (req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
