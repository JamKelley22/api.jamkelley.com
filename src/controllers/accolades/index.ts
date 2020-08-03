import express from 'express';
import path from 'path';

const app = express();

const baseEndpoint = '/accolades';
const accoladesFolder = '../../../data/Accolades';
const accoladesFileJSON = '/accolades.json';

app.get(`${baseEndpoint}`, function (req, res) {
  res.sendFile(path.join(__dirname, accoladesFolder, accoladesFileJSON));
});

export { app as accolades };
