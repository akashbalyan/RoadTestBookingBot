import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
// Load environment variables from .env file , 
//removed / from '.env'
dotenv.config({ path: path.resolve(__dirname, '.env') });

export const config = {
  roadtestcreds: {
    surname: process.env.ROADTEST_ACCESS_SURNAME || '',
    licensenumber: process.env.ROADTEST_ACCESS_LICENSENUMBER || '',
    keyword: process.env.ROADTEST_ACCESS_KEYWORD || '',
  }
};