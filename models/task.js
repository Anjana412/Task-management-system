import mongoose from 'mongoose'

let taskSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title:{
        type:String,
        required: [true,"Title is required"],
        trim:true,
    },
    description:{
        type:String,
        trim:true,
        default:"",
    },
    status:{
        type:String,
        enum: ["Pending","Completed"],
        default: "Pending",
    },
    dueDate:{
        type:Date,
        required:[true, "Due date is required"],
    },
    
},

{timestamps: true}

);

const Task = mongoose.model("Task",taskSchema);

export default Task;

