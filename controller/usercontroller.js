import User from "../models/user.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = async (req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email ||!password){
            return res.status(400).json({message:"All fields needs to be filled"});
        }

        if(password.length <6){
            return res.status(400).json({message:"Password must be atleast 6 charachters"});
        }

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"Email already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10); 
        const newUser=new User({name,email,password:hashedPassword});
        const savedUser=await newUser.save();

        const token =jwt.sign({
            userId:savedUser._id,
            email:savedUser.email
        },
        
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
        );
    

        return res.status(201).json({message:"Registered Successfully",token,user:{_id:savedUser._id,name:savedUser.name,email:savedUser.email}})

    }
    catch(e){
        console.error("Register error:",e);
        return res.status(500).json({message:"Error durig registration"})

    }
};

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email ||!password){
        return res.status(400).json({message:"please fill email and password "});
        }

        const user=await User.findOne({email});

        if(!user){
        return res.status(401).json({message:"Invalid email or password"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
        return res.status(401).json({message:"Invalid password"});
        }

        const token = jwt.sign({
            userId:user._id,
            email:user.email
        },
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    );

    return res.status(200).json({message:"Login successful",token,user:{_id:user._id,name:user.name,email:user.email}});

    }
    catch(e){
        console.error("Login error:",e);
        return res.status(500).json({message:"Login failed"});
        
    }
}