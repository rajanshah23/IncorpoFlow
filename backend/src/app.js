require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
const companyRoutes=require('./routes/company.routes');
 
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Company Incorporation API',
    documentation: '/api/health',
    version: '1.0.0'
  });
});

app.use('/api/v1/companies',companyRoutes);


module.exports=app;