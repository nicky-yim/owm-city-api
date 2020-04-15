const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;
const PATH = './city.list.min.json';
let cities;

fs.readFile(PATH, (err, data) => {
  if (err) throw err;
  cities = JSON.parse(data);
});

app.get('/', (req, res) => {
  res.send(cities[0].name);
});

app.get('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.listen(PORT, () => console.log('Listening to port: ' + PORT));
