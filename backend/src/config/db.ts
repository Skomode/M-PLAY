import mongoose from 'mongoose';
import { ENV } from './env.config';

export const connectDB = async () => {
    try {
        await mongoose.connect(ENV.MONGO_URI);
        console.log('conexion a db');
    } catch (error){
        console.error('error al conectar con la DB ', error);
        process.exit(1);
        }
};