import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    try {
        const connectionString = process.env.CONNECTION_STRING

        if (!connectionString)
            throw new Error('There have not any connection string.');

        await mongoose.connect(connectionString);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
