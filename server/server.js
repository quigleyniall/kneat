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
  let page = 1;
  let lastPage = false;
  let results = [];

  while (!lastPage) {
    const request = await axios.get(`/starships?page=${page}`);
    const response = await request.data;

    results = [...results, ...response.results];

    lastPage = response.next === null;

    page++;
  }

  return res.json(results);
});

api.get('/vehicles', async (req, res) => {
  let page = 1;
  let lastPage = false;
  let results = [];

  while (!lastPage) {
    const request = await axios.get(`/vehicles?page=${page}`);
    const response = await request.data;

    results = [...results, ...response.results];

    lastPage = response.next === null;

    page++;
  }

  return res.json(results);
});

api.get('/species', async (req, res) => {
  let page = 1;
  let lastPage = false;
  let results = [];

  while (!lastPage) {
    const request = await axios.get(`/species?page=${page}`);
    const response = await request.data;

    results = [...results, ...response.results];

    lastPage = response.next === null;

    page++;
  }

  return res.json(results);
});

api.get('/films', async (req, res) => {
  const request = await axios.get(`/films`);
  const response = await request.data;

  return res.json(response.results);
});

api.get('/people', async (req, res) => {
  let page = 1;
  let lastPage = false;
  let results = [];

  while (!lastPage) {
    const request = await axios.get(`/people?page=${page}`);
    const response = await request.data;

    results = [...results, ...response.results];

    lastPage = response.next === null;

    page++;
  }

  return res.json(results);
});

api.listen(8080, () => {
  console.log('Running');
});
