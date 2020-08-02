import express from 'express';
import path from 'path';

const app = express();

const baseEndpoint = '/chatbot';
const chatbotFolder = '../../../data/Chatbot';

app.get(`${baseEndpoint}/:filename`, function (req, res) {
  res.sendFile(path.join(__dirname, chatbotFolder, req.params.filename));
});

export { app as chatbot };
