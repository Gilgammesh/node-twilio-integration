// Import the dependencies
import * as dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

// Application variables
export const appPort: number =
  parseInt(process.env.APP_TWILIO_PORT as string, 10) || 3000;

// Twilio variables
export const accountSid =
  process.env.TWILIO_ACCOUNT_SID || 'twilio_account_sid';
export const authToken = process.env.TWILIO_AUTH_TOKEN || 'twilio_auth_token';
export const phoneNumber = process.env.TWILIO_PHONE_NUMBER || '+1XXXXXXXXXX';
