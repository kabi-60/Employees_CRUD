import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import employeeRoutes from './routes/employeeRoutes.js';

const app = express();


app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);


mongoose.connect('mongodb://localhost:27017/employeeCRUD')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(5000, () => {
      console.log('Server running on port 5000');
    });
  })
  .catch((err) => {
    console.log('MongoDB connection error:', err);
  });
