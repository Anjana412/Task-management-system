import express from "express";
import cors from 'cors';
import { connectDB } from "./utils/db.js";
import 'dotenv/config'
import userrouter from "./Routes/userRoutes.js";
import taskrouter from "./Routes/taskRoutes.js";

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json());
app.use('/user',userrouter)
app.use('/tasks',taskrouter)



const PORT = 4000;

connectDB().then(() => {
    app.listen(PORT, ()=> {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("DB connection failed:",err.message);
    
});
