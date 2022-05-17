import { config } from 'dotenv';
config();

export default {
env: process.env.NODE_ENV || 'development',
port: process.env.PORT || 3000,
dbUser: process.env.DB_USER,
dbPass: process.env.DB_PASSWORD,
dbHost: process.env.DB_HOST,
dbName: process.env.DB_NAME,
dbPort: process.env.DB_PORT,
SECRET: process.env.TokenSecret
};
