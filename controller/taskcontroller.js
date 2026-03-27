import Task from "../models/task.js";

export const createTask = async(req,res)=>{
    try{
        const {title,description,dueDate,status} = req.body;

        if(!title || !dueDate){
            return res.status(400).json({message:"Title and due date are required"});
        }

        const newTask = new Task({
            user:req.user.userId,
            title,
            description,
            dueDate,
            status
        });

        const savedTask= await newTask.save();
        return res.status(201).json({message:"Task created sucessfully",task:savedTask});

    }
    catch(e){
        return res.status(500).json({message:"Error creating task"});
    }
}

export const getallTask = async(req,res)=>{
    try{
        const tasks= await Task.find({user:req.user.userId}).sort({createdAt:-1});

        const total = tasks.length;
        const Completed = tasks.filter((t)=>t.status === "Completed").length;
        const pending = tasks.filter((t)=>t.status === "Pending").length;

        return res.status(200).json({tasks,stats:{total,Completed,pending}});

    }
    catch(e){
        console.error("Error at getting all tasks",e);
        return res.status(500).json({message:"Error fetching tasks"});

    }
}

export const getTask = async(req,res)=>{
    try{
        const task= await Task.findOne({_id:req.params.id,user:req.user.userId});

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        return res.status(200).json({task});
    }
    catch(e){
        console.error("Get task error",e);
        return res.status(500).json({message:"Error fetching task"});
        
    }
}

export const updateTask = async(req,res)=>{
    try{
        const {title,description,dueDate,status} = req.body;

        const task = await Task.findOneAndUpdate({_id:req.params.id, user:req.user.userId},
            {title,description,dueDate,status},
            {new:true,runValidators:true}
        );

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

            return res.status(200).json({message:"Task Updated",task});

    }
    catch(e){
        console.error("Can't Update Task",e);
        return res.status(500).json({message:"Error updating task"});

    }
};


export const deleteTask = async(req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id,user:req.user.userId});

        if(!task){
            return res.status(404).json({message:"Task not found"});
        }

        return res.status(200).json({message:"Task deleted"});
    }
    catch(e){
        console.error("Cannot delete Task",e);
        return res.status(500).json({message:"Error deleting task"});
    }
}