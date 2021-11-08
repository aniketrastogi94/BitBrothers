const express=require("express");
const bodyParser=require('body-parser');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const connectDB=require('./utilis/db');
const UserRoutes=require('./routes/users');
connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/user',UserRoutes);

app.listen(5000,console.log('Server running on port 5000'));