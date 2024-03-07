import DepartmentModel from "../models/Department.js";

export const CreateDepartment = async(req,res)=>{
    try {
        const deptData = await DepartmentModel.create({
            name:req.body.name,
            image:req?.file?.filename,
            University:req.body.suraj
        });
        if(deptData) res.status(201).send({message:"Department Created!!"});
        else res.status(400).send({message:"Unable to create Departmnet!!"});
        
    } catch (e) {
        res.status(404).send({error:e?.message});
    }
}

export const UpdateDepartment = async(req,res)=>{
    try {
        const deptData = await DepartmentModel.findByIdAndUpdate({_id:req.body._id},{
            name:req.body.name,
            image:req?.file?.filename,
            University:req.body.suraj
        });
        if(deptData) res.status(201).send({message:"Department Updated !!"});
        else res.status(400).send({message:"Unable to update Departmnet!!"});
        
    } catch (e) {
        res.status(404).send({error:e?.message});
    }
}

export const DeleteDepartment =async(req,res)=>{
    try {
        const depData = await DepartmentModel.deleteOne({_id:req.body.id});
        if(depData.deletedCount==1) res.status(201).send({depData});
    } catch (e) {
        res.status(404).send({error:e.message});
    }
}

export const GetDepartmentByUniversityId=async(req,res)=>{
    try {
        const depData = await DepartmentModel.find({
            University:req.query.suraj
        }).populate("University");
        res.status(201).send({depData});
        
    } catch (e) {
        res.status(404).send({error:e.message});
    }
}