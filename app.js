const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;
const PATH = './city.list.min.json';
var cities;

const buildCities = () => {
  console.log('Reading', PATH);

  fs.promises
    .readFile(PATH, (err, data) => {
      if (err) throw err;
      return data;
    })
    .then((data) => (cities = JSON.parse(data)))
    .catch((err) => console.error(err));
};
buildCities();

app.get('/search/', (req, res) => {
  res.send([]);
});

app.get('/search/:query', (req, res) => {
  res.send(req.params.query);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log('Listening to port: ' + PORT));
