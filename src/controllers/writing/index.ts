import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();

const baseEndpoint = '/writing';
const writingFolder = '../../../data/Writing';

app.get(`${baseEndpoint}`, function (req, res) {
  fs.readdir(path.join(__dirname, writingFolder), (err, files) => {
    res.json(files);
  });
});

app.get(`${baseEndpoint}/:filename`, function (req, res) {
  const file = path.join(__dirname, writingFolder, req.params.filename);
  res.sendFile(file);
});

export { app as writing };
