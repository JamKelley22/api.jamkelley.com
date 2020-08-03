require('dotenv').config(); // eslint-disable-line
//import { createClient } from 'contentful-management';
import errorHandler from 'errorhandler';
import express from 'express';
import https from 'https';
import fs from 'fs';

import { config, connection } from './config';
import * as Const from './constants';
import * as Controller from './controllers';

const app = express();

const baseEndpoint = '/api';

app.use(config);
const controllers = [
  Controller.accolades,
  Controller.resume,
  Controller.writing,
  Controller.downloads,
  Controller.chatbot,
  Controller.arguebot,
  Controller.projects
];
controllers.forEach((controller) => app.use(baseEndpoint, controller));

//Ensured in constants.ts that these would be defined or the application will throw error
// const contentfulClient = createClient({
//   accessToken: Const.CONTENTFUL_ACCESS_TOKEN!
// });

if (app.get('env') === 'development') {
  const DEV_PORT = 4000;
  app.use(errorHandler());
  app.listen(DEV_PORT);
  console.log(`Running a DEV API server at http://localhost:${DEV_PORT}`); // eslint-disable-line
} else {
  const key = fs.readFileSync(`${Const.CERT_DIR}/privkey.pem`);
  const cert = fs.readFileSync(`${Const.CERT_DIR}/cert.pem`);
  const options = {
    key: key,
    cert: cert
  };
  const server = https.createServer(options, app);
  server.listen(Const.PORT, () => {
    console.log('Server starting on port: ' + Const.PORT); // eslint-disable-line
  });
}

connection.connect(function (err) {
  if (err) throw err;
  // console.log('Connected!');
});
