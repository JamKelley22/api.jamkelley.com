import express from 'express';
import path from 'path';

const app = express();

const baseEndpoint = '/projects';
const projectsFolder = '../../../data/Projects';
const projectsJSONFile = '/projects.json';

app.get(`${baseEndpoint}`, function (req, res) {
  res.sendFile(path.join(__dirname, projectsFolder, projectsJSONFile));
});

export { app as projects };
