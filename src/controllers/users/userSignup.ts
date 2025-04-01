import User from "../../models/user.model";
import crypto from "crypto-js";
import { Request, Response } from "express";
import { userZODSchema } from "../../zod/user";


export const userSignup =async (req : Request, res : Response):Promise<any> => {
        const body =  req.body;
        const userSignupData = userZODSchema.safeParse(body);
        if(!userSignupData.success){
            return res.status(400).json({message: userSignupData.error.message});
        }

        try{
            const isUserExist = await User.findOne({email: userSignupData.data.email});
            if(isUserExist){
                return res.status(400).json({message: "User already exist"});
            }

            let username = userSignupData.data.username || userSignupData.data.email.split("@")[0];

            const newUser = new User({
                username: username,
                name: userSignupData.data.name,
                email: userSignupData.data.email,
                password: userSignupData.data.password,
                apiKey : crypto.SHA256(crypto.MD5(userSignupData.data.email)).toString().slice(0,32)
            });
            await newUser.save();
            return res.status(200).json({message: "User created successfully"});

        }catch(error){
            return res.status(500).json({message: "Internal server error :userSignup"});
        }
        
        
       

    
    }