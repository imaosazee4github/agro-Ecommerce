import path from 'path'
import express from 'express'
import dotenv from 'dotenv';
import connectDB from './db/config.js';
import userRoute from './routes/userroute.js'
import cookieParser from 'cookie-parser';
import categoryRouter from './routes/categoryRoute.js'
import productRouter from './routes/productRouter.js'
import uploadRoutes from './routes/uploadImageRouter.js' 
import { fileURLToPath } from 'url'

 dotenv.config()
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/user', userRoute)
app.use('/api/category', categoryRouter)
app.use('/api/product', productRouter)
app.use("/api/uploads", uploadRoutes)



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