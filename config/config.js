import dotenv from 'dotenv';

dotenv.config();

const db = process.env.NODE_ENV === 'test' ? process.env.MONGO_TEST : process.env.MONGO_URL;
const port = process.env.PORT || 3000;


const config = {
  db,
  port,
  secret: process.env.SECRET
};

export default config;