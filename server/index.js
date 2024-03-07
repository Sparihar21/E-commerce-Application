import  express  from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import multer from "multer";
import { CreateUniverity, DeleteUniversity, GetUniversity, UpdateUniversity } from "./controller/University.js";
import { CreateDepartment, DeleteDepartment, GetDepartmentByUniversityId, UpdateDepartment } from "./controller/Department.js";
import { CreateProduct, DeleteProduct, GetProductDetails, GetPtoductsByDepartmentId, UpdateProduct, UpdateProductQty } from "./controller/Product.js";
import { Login, Register } from "./controller/User.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());

//University Model
const univStorage = multer.diskStorage({
    destination:"UploadUniv",
    filename:(req,file,cb)=>{
        (cb(null,`${Date.now()}--${file.originalname}`));
    }
});

const uploadUniv= multer({
    storage:univStorage
});
app.post("/university",uploadUniv.single('image'),CreateUniverity);
app.put("/university",uploadUniv.single('image'),UpdateUniversity);
app.delete("/university",DeleteUniversity);
app.get("/university",GetUniversity);

app.use(express.static("UploadUniv"));
app.use(express.static("UploadDep"));
app.use(express.static("uploadproduct"));
//Department Model
const depStorage = multer.diskStorage({
    destination:"UploadDep",
    filename:(req,file,cb)=>{
        (cb(null,`${Date.now()}--${file.originalname}`));
    }
});

const uploadDep= multer({
    storage:depStorage
});
app.post("/department",uploadDep.single('image'),CreateDepartment);
app.put("/department",uploadDep.single('image'),UpdateDepartment);
app.delete("/department",DeleteDepartment);
app.get("/department",GetDepartmentByUniversityId);

//Product Model
const storageProduct=multer.diskStorage({
    destination:"uploadproduct",
    filename:(req,file,cb)=>{
        cb(null, `${Date.now()}--${file.originalname}`);
    },
})
const uploadProduct=multer({
    storage:storageProduct,
});

app.post("/product",uploadProduct.array('images'),CreateProduct);
app.put("/product",uploadProduct.array('images'),UpdateProduct);
app.delete("/product",DeleteProduct);
app.get("/product",GetPtoductsByDepartmentId);
app.post("/productQty",UpdateProductQty);
app.get("/productDetails",GetProductDetails);

//User Model
app.post("/user", Register);
app.get("/user",Login);
mongoose.connect(process.env.DB_URL).then((d)=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,()=>{
        console.log("App is listening on PORT: " + process.env.PORT)
    })

}).catch((e)=>{
    console.log({error:e?.message});
})
