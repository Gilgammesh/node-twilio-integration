// Import dependencies
import { Handler } from 'express';
import sendSms from './sendSms';
import twilio from 'twilio';
import axios from 'axios';

// Controller for send sms
export const send: Handler = async (req, res) => {
  const { to, message } = req.body;

  try {
    await sendSms(to, message);
    res.send('Message sent successfully');
  } catch (error) {
    res.status(404).send('Message could not be sent');
  }
};

// Controller for parse sms and save information
export const parse: Handler = async (req, res) => {
  console.log(req.body);

  if (req.body.MediaUrl0) {
    console.log('urlImg =>', req.body.MediaUrl0);

    try {
      const result = await axios(req.body.MediaUrl0);
      console.log('result =>', result);

      let headerLine = result.headers['content-disposition'];
      let startIdx = headerLine.indexOf('"') + 1;
      let endIdx = headerLine.lastIndexOf('"');
      const fileName = headerLine.substring(startIdx, endIdx);
      console.log('fileName =>', fileName);

      const fileMimeType = result.headers['content-type'];
      console.log('fileMimeType =>', fileMimeType);

      const fileSize = parseInt(result.headers['content-length'], 10);
      console.log('fileSize =>', fileSize);

      const fileBuffer = Buffer.from(result.data);
      console.log('fileBuffer =>', fileBuffer);
    } catch (error) {
      console.log(error);
    }
  }

  const MessagingResponse = twilio.twiml.MessagingResponse;

  const twiml = new MessagingResponse();
  const message = twiml.message(`Message received: ${req.body.Body}`);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};
