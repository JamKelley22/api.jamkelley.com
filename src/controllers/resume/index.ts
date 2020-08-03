import express from 'express';
import path from 'path';
import fs from 'fs';

import { Error, ErrorCode } from '../../types';

const app = express();

const baseEndpoint = '/resume';
const resumeFolder = '../../../data/Resume';
const jsonResume = '/resume.json';
const pdfResume = '/resume.pdf';

app.get(`${baseEndpoint}/json`, function (req, res) {
  res.sendFile(path.join(__dirname, resumeFolder, jsonResume));
});

app.get(`${baseEndpoint}/pdf`, function (req, res) {
  res.sendFile(path.join(__dirname, resumeFolder, pdfResume));
});

app.get(`${baseEndpoint}/json/status`, function (req, res) {
  const jsonExists = fs.existsSync(
    path.join(__dirname, resumeFolder, jsonResume)
  );
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

app.get(`${baseEndpoint}/pdf/status`, function (req, res) {
  const pdfExists = fs.existsSync(
    path.join(__dirname, resumeFolder, pdfResume)
  );
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
