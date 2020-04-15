const express = require('express');
const fs = require('fs');
const Fuse = require('fuse.js');
const app = express();

const PORT = 3000;
const PATH = './city.list.min.json';
var cities;

const buildCities = () => {
  fs.promises
    .readFile(PATH, (err, data) => {
      if (err) throw err;
      return data;
    })
    .then((data) => (cities = JSON.parse(data)));
};
buildCities();

app.get('/search/:query', (req, res) => {
  res.send(req.params);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log('Listening to port: ' + PORT));
