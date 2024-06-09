import express, { urlencoded } from 'express';
import connectDb from './connection.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import userRouter from './routes/user.router.js';
import categoryRouter from './routes/category.router.js';
import facilitatorRouter from './routes/facilitator.router.js';
import cartRouter from './routes/cart.router.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "*",
    credentials: true
}));

connectDb();

app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/facilitators', facilitatorRouter);
app.use('/api/cart', cartRouter);

app.listen(process.env.PORT, () => {
    console.log(`server is listening at ${process.env.PORT}...`);
});
