import express from 'express';
import path from 'path';
import fs from 'fs';

import { Error, ErrorCode } from '../../types';

const app = express();

const baseEndpoint = '/downloads';
const downloadsFolder = '/Downloads';

app.get(`${baseEndpoint}`, function (req, res) {
  res.sendFile(path.join(__dirname, downloadsFolder, 'info.json'));
});

app.get(`${baseEndpoint}/:filename`, function (req, res) {
  const file = path.join(__dirname, downloadsFolder, req.params.filename);
  res.sendFile(file);
});

app.get(`${baseEndpoint}/:filename/status`, function (req, res) {
  const filePath = path.join(__dirname, downloadsFolder, req.params.filename);
  const fileExists = fs.existsSync(filePath);
  if (!fileExists) {
    res.status(404);
    res.json(
      new Error({
        error: true,
        code: ErrorCode.NOT_FOUND,
        message: req.params.filename + ' does not exist'
      })
    );
    return;
  }
  res.status(200);
  res.json(
    new Error({
      error: false
    })
  );
});

export { app as downloads };
