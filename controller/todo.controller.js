const TodoModel=require('../models/todo.model')


exports.create=async (req,res) =>{
    try {
        const {userName,title,category}=req.body
        const data={
            userName,
            title,
            taskDone:false,
            category,
        }
        const found=await TodoModel.findOne({userName:userName});
        if(found){
           return res.status(400).json({
                message:"User name is already exist please use different username"
            })
        }
        const newTodoList=await TodoModel.create(data)
        return res.status(201).json({
            status:"Success",
            message:"Data saved successfully!",
            data:newTodoList
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getAllList=async(req,res)=>{
    try {
        const todoLists=await TodoModel.find().sort({createdAt:-1})
        return res.status(201).json({
            status:"Success",
            data:todoLists
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.getTodoById=async(req,res)=>{
    try {
        const {id}=req.params;
        const data=await TodoModel.findById(id)
        if(data){
            return res.status(201).json({
                status:"Success",
                data:data
            });
        }else{
            return res.status(404).json({
                message:"No data Found"
            });
        }
      
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.updateById=async (req,res)=>{
    try {
        const {id}=req.params;
        const {title,taskDone,category}=req.body;
        const data={title,taskDone,category,updatedAt:new Date()}
    const data1= await TodoModel.findByIdAndUpdate(id,data,{runValidators:true})
        return res.status(201).json({
            status:"Success",
            message:"Data updated successfully!",
            data:data1
        });
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

exports.deleteById=async(req,res)=>{
   try {
    const {id}=req.params ;
    await TodoModel.findByIdAndDelete(id)
    return res.status(201).json({
        status:"Success",
        message:"Data deleted successfully!",
    });
   } catch (error) {
    res.status(400).json({
        message:error.message
    })
   }

}

exports.filterByTitleAndCategory=async (req,res)=>{
    try {
        const {title,category}=req.query
        console.log(title,category);
        if(title && category){
            const data = await TodoModel.find({
                title:{$regex:title,$options: '$i'},
                category:category   
                 }).sort({createdAt:-1});
                 res.status(200).json(data);
        }
        if(title && !category){
            const data = await TodoModel.find({
                title:{$regex:title,$options: '$i'},
                 }).sort({createdAt:-1});
                 res.status(200).json(data);
        }
        if(category && !title ){
            const data = await TodoModel.find({
                category:category  
                 }).sort({createdAt:-1});
                 res.status(200).json(data);
        }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }
}

