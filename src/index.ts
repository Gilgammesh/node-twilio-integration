// Import dependencies
import http from 'http';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import * as sms from './controllers/sms.controller';
import { appPort } from './configs';

// Initialize express
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(json());
app.use(urlencoded({ extended: false }));

// Routes bases
const basePath: string = '/api';

// Route Hello
app.get(`${basePath}/hello`, (req, res) => {
  return res.json('Hello from API');
});

// Route Post sent sms from twilio to clients
app.post(`${basePath}/sendSms`, sms.send);

// Route Post parse incoming sms and save information
app.post(`${basePath}/parseSms`, sms.parse);

// Initialize app server
http.createServer(app).listen(appPort, () => {
  console.log(`Server running on port ${appPort}, ready to work!!`);
});
