import ProductModel from "../models/Product.js";

export const CreateProduct = async(req,res)=>{
    try {
        let images=req?.files?.map((item)=>{
            return item.filename;
        });
        const proData = await ProductModel.create({
            name:req.body.name,
            description:req.body.description,
            qty:req.body.qty,
            price:req.body.price,
            images:images,
            department:req.body.departmentId
        });
        if(proData) res.status(200).send({message:"Product Created"});
        else res.status(400).send({message:"Unable to create Product"});
    } catch (e) {
        res.status(404).send({error:e?.message});
    }
}

export const UpdateProduct=async (req,res)=>{
    try {
        let images=req?.files?.map((item)=>{
            return item.filename;
        });
        const proData=await ProductModel.findByIdAndUpdate({_id:req.body._id},
            {
                name:req.body.name,
                description:req.body.description,
                qty:req.body.qty,
                price:req.body.price,
                images:images,
                department:req.body.departmentId
            });
        if(proData) res.status(200).send({message:"Product Updated"});
        else res.status(400).send({message:"Unable to Update Product"});
    } catch (e) {
        res.status(404).send({error:e.message});
    }
}

export const DeleteProduct=async (req,res)=>{
try {
        const proData= await ProductModel.deleteOne({_id:req.body._id});
        if(proData.deletedCount==1)
        res.status(201).send({proData});
} catch (e) {
    res.status(404).send({error:e.message});
}
}

export const GetPtoductsByDepartmentId=async(req,res)=>{
    try {
        const proData=await ProductModel.find(
            {department:req.body.departmentId}).populate(
                {path:"department",populate:[{path:"University"}]});
        res.status(201).send({proData});
    } catch (e) {
        res.status(404).send({error:e?.message});        
    }
}

export const GetProductDetails =async (req,res)=>{
    try {
        const proData=await ProductModel.findOne({_id:req.body._id}).populate(
            {path:"department",populate:[{path:"University"}]});
        res.status(201).send({proData});
    } catch (e) {
        res.status(404).send({error:e.message})
    }
}

export const UpdateProductQty=async (req,res)=>{
    try {
        let productInDb=await ProductModel.findOne({_id:req.body._id});
        let active = true;
        if(productInDb.qty-req.body.qty<=0){
            active=false;
        }
        let productData = await ProductModel.findByIdAndUpdate({_id:req.body._id},{active:active,
                                qty:productInDb.qty-req.body.qty
        });
        if(productData) res.status(201).send({message:"Product Update Qty"});
        else res.status(404).send({message:"Product Qty Not updated"});
    } catch (e) {
        res.status(404).send({error:e.message});
    }
}