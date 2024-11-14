import express from 'express';
import authRouter from './auth/routes/auth.routes';
import connectDB from './config/database';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use('/api', authRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error: Error) => {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1);
    });
