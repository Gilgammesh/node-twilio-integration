// Import dependencies
import twilio from 'twilio';
import { accountSid, authToken, phoneNumber } from '../configs';

// Function for send sms
const sendSms = async (to: string, body: string) => {
  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body,
      from: phoneNumber,
      to
    });
    console.log(message);
  } catch (error) {
    console.log(error);
  }
};

export default sendSms;
