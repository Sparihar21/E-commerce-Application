import UserModel from "../models/User.js";

export const Register =async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email});
        if(user) {
            req.status(404).send({message:"User is already registered"});
            return ;
        }
        var userInfo = await UserModel.create({
            ...req.body,
            profilePic:req?.file?.filename
        });
        if(userInfo) res.status(201).send({message:"User Created"});
        else res.status(404).send({message:"User Not Created"});
    } catch (e) {
        res.status(404).send({error:e.message});
    }
}

export const Login =async(req,res)=>{
    try {
        let user = await UserModel.findOne({email:req.body.email,password:req.body.password});
        if(user) res.status(201).send({_id:body._id,role:body.role});
        else res.status(404).send({message:"Wrong U/P"});
    } catch (e) {
        res.status(404).send({error:e.message});
    }
}