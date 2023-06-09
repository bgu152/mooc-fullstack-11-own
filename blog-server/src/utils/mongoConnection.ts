import mongoose from 'mongoose';
const url = process.env.DB_URL;
import { DB_NAME } from './config';
mongoose.set('strictQuery', true);
const connectDB = async () => {
    if (!url) {
        throw 'no database url';
    }
    try {
        mongoose.connect(url, {
            dbName: DB_NAME,
        });
    } catch (err) {
        console.error(err);
    }
};
export default connectDB;
