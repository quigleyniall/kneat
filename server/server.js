const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const api = express();

api.use(cors());
api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json({ limit: '5mb' }));

axios.defaults.baseURL = 'http://swapi.co/api';

api.get('/starships', async (req, res) => {
  const { page } = req.query;
  let allResults = [];
  if (page !== 'all') {
    const request = await axios.get(`/starships?page=${page}`);
    allResults = await request.data.results;
  } else {
    let pageNumber = 1;
    while (pageNumber !== 'last') {
      const request = await axios.get(`/starships?page=${pageNumber}`);
      const response = await request.data;
      allResults = [...allResults, ...response.results];
      response.next ? pageNumber++ : (pageNumber = 'last');
    }
  }

  return res.json(allResults);
});

api.listen(8080, () => {
  console.log('Running');
});
