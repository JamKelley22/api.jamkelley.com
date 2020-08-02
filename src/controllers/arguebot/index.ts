import express from 'express';
import path from 'path';

const app = express();

const baseEndpoint = '/arguebot';
const argurbotFolder = '../../../data/Arguebot';

app.get(`${baseEndpoint}/:filename`, function (req, res) {
  res.sendFile(path.join(__dirname, argurbotFolder, req.params.filename));
});

export { app as arguebot };
