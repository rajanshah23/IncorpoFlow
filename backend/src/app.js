require('dotenv').config();
const express=require('express');
const cors=require('cors');
const app=express();
const sequelize=require('./config/database');
 
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
 app.get('/',(req,res)=>{
        res.send('Company Incorporation Tool Backend is running');
 });



module.exports=app;