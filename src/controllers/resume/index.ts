import express from 'express';
import path from 'path';
import fs from 'fs';

import { Error, ErrorCode } from '../../types';

const app = express();

const baseEndpoint = '/resume';
const resumeJSONPath = './resume.json';
const resumePDFPath = './resume.pdf';

app.get(`${baseEndpoint}/json`, function (req, res) {
  res.sendFile(path.join(__dirname, resumeJSONPath));
});

app.get(`${baseEndpoint}/pdf`, function (req, res) {
  res.sendFile(path.join(__dirname, resumePDFPath));
});

app.get(`${baseEndpoint}/json/status`, function (req, res) {
  const jsonExists = fs.existsSync(resumeJSONPath);
  if (!jsonExists) {
    res.status(404);
    res.json(
      new Error({
        error: true,
        code: ErrorCode.NOT_FOUND,
        message: `Resume JSON does not exist`
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

app.get('/api/resume/pdf/status', function (req, res) {
  const pdfExists = fs.existsSync(resumePDFPath);
  if (!pdfExists) {
    res.status(404);
    res.json(
      new Error({
        error: true,
        code: ErrorCode.NOT_FOUND,
        message: `Resume PDF does not exist`
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

export { app as resume };
