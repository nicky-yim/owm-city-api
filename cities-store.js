const fs = require('fs');
const PATH = './city.list.min.json';

var cities = [];

const build = () => {
  console.log('Reading', PATH);

  fs.promises
    .readFile(PATH, (err, data) => {
      if (err) throw err;
      return data;
    })
    .then((data) => (cities = JSON.parse(data)))
    .catch((err) => console.error(err));
};

const compare = (query, x, y) => {
  let keyword = query.toLowerCase();
  let a = x.name.toLowerCase(),
    b = y.name.toLowerCase();
  let exactMatch = new RegExp(`^${keyword}$`, 'i');

  return a.match(exactMatch) || a.indexOf(keyword) < b.indexOf(keyword)
    ? -1
    : 1;
};

const search = (query) => {
  let queries = query.split(',').map((q) => q.trim());
  if (!queries) return [];

  let name = queries[0];
  let res = cities.filter((city) => {
    let regex =
      queries.length > 1 ? new RegExp(`^${name}$`, 'i') : new RegExp(name, 'i');
    return city.name.match(regex);
  });

  if (queries.length > 1) {
    let state = queries.length > 2 ? queries[1] : null;
    let country = queries.length > 2 ? queries[2] : queries[1];

    res = res.filter((city) => {
      return (
        (!state || city.state.match(new RegExp(state, 'i'))) &&
        city.country.match(new RegExp(country, 'i'))
      );
    });
  }

  return res.sort((x, y) => compare(name, x, y));
};

module.exports = { build, search };
