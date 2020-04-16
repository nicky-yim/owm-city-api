require('dotenv').config();

const express = require('express');
const citiesStore = require('./cities-store');
const app = express();
const PORT = process.env.PORT || 3000;

citiesStore.build();

app.get('/search/', (req, res) => {
  res.send([]);
});

app.get('/search/:query', (req, res) => {
  res.send(citiesStore.search(req.params.query));
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log('Listening on port: ' + PORT));
