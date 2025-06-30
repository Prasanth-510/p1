import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import employeeRouter from "./routes/employeeRoutes.js"
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// app.get('/',);



const PORT = process.env.PORT || 3001;
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

connectDatabase();


app.use('/', employeeRouter);