const { urlencoded } = require('express');
const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
require('dotenv').config()
const app=express()
const port =process.env.PORT
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors());

mongoose.connect(process.env.API,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
  
}).then(() => console.log('DB Connection Successful'))
.catch((err) =>{
    console.log('Database Connection failed....');
    console.log(err);
})

app.get('/',(req,res)=>{
    res.send("Welcome")
})

app.use('/todo',require('./routes/todo.route'))


app.listen(port,()=>{
    console.log(`Server is running at port :${port}`);
})