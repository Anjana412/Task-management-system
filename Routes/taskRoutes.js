import express from 'express'
import { createTask, deleteTask, getallTask, getTask, updateTask } from '../controller/taskcontroller.js';
import verifyToken from '../middleware/auth.js';

const taskrouter = express.Router();

taskrouter.use(verifyToken);

taskrouter.post("/addtask",createTask);
taskrouter.get("/viewalltasks",getallTask);
taskrouter.get("/viewtask/:id",getTask);
taskrouter.put("/updatetask/:id",updateTask);
taskrouter.delete("/deletetask/:id",deleteTask);

export default taskrouter;