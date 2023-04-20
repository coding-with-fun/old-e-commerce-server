import mongoose from 'mongoose';
import logger from './logger';
import env from '../env';

const connectDB = async (): Promise<void> => {
    await mongoose.connect(env.mongo.mongoURI, {
        dbName: 'e-commerce',
    });
    mongoose.set('debug', true);

    logger.info('MongoDB connected...');
};

export default connectDB;
