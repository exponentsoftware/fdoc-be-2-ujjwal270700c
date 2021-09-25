const mongoose=require('mongoose');

const todoSchema= new mongoose.Schema({
  userName:{
      type:String,
      required:[true,"Please tell us User Name"],
      unique:true
  },
  title:{
    type:String,
    required:[true,"Please tell us Title"]
   },
  taskDone: {
      type:String,
      enum:["true","false"]
   },
   category:{
       type:String,
       required:[true,"Please tell us Category"],
       enum:["work","hobby","task"]
   }

},{timestamps:true})

module.exports= mongoose.model('todo',todoSchema);
