import UniversityModel from "../models/University.js"


export const CreateUniverity=async (req,res)=>{
try {
    const univData = await UniversityModel.create({
        name:req.body.name,
        image:req.file.filename
    });
    if(univData) res.status(201).send({message:"University Created"})
    else res.status(400).send({message:"Unable to Create University"})
} catch (e) {
    res.status(400).send({error:e.message});
    
}
}

export const UpdateUniversity =async (req,res)=>{
    try {
        const univData= await UniversityModel.findByIdAndUpdate({
            _id:req.body._id
        },{name:req.body.name,
            image:req.file.filename});
            if(univData) res.status(201).send({message:"University Updated"})
            else res.status(400).send({message:"Unable to Update University"})
    } catch (e) {
        res.status(400).send({error:e.message});
    }
}

export const DeleteUniversity=async (req,res)=>{
    try {
        const univData=await UniversityModel.deleteOne({
            _id:req.body._id
        })
        if(univData.deletedCount==1) res.status(201).send({message:"Deleted Univ"})
        else res.status(400).send({message:"Unable to Delete"})
    } catch (e) {
        res.status(400).send({error:e.message});
    }
}

export const GetUniversity = async(req,res)=>{
    try {
        const univData = await UniversityModel.find();
        res.status(200).send({univData}); 
    } catch (e) {
        res.status(404).send({error:e?.message});
    }
}