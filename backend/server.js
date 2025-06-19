import path from 'path'
import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import connectDB from './db/config.js';
import userRoute from './routes/userroute.js'
import cookieParser from 'cookie-parser';
import categoryRouter from './routes/categoryRoute.js'



 dotenv.config()
const app = express()
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/user', userRoute)
app.use('/api/category', categoryRouter)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});


app.use((err, req, res, next) => {
  const status = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(status).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

connectDB().then(() => {
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`)
})
})