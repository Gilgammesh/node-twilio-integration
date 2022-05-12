// Import dependencies
import { Handler } from 'express';
import sendSms from './sendSms';
import twilio from 'twilio';

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

  const MessagingResponse = twilio.twiml.MessagingResponse;

  const twiml = new MessagingResponse();
  const message = twiml.message(`Message received: ${req.body.Body}`);

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
};
