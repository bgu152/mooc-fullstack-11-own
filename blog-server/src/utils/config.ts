import dotenv from 'dotenv';
dotenv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const DB_NAME =
    process.env.NODE_ENV === 'test'
        ? process.env.TEST_DB_NAME
        : process.env.DB_NAME;
const SECRET = process.env.SECRET;

export { DB_URL, PORT, DB_NAME, SECRET };
