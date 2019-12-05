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
  const request = await axios.get('/starships');

  const response = await request.data;
  return res.json(response);
});

api.listen(8080, () => {
  console.log('Running');
});
