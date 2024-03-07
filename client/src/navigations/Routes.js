import About from "../container/about/About";
import Department from "../container/admin/department/Department";
import Product from "../container/admin/product/Product";
import University from "../container/admin/university/University";
import Contact from "../container/contacts/Contact";
import Login from "../container/login/Login";
import Register from "../container/register/Register";
import Support from "../container/support/Support";
import Home from "../container/user/home/Home";
import UserProduct from "../container/user/product/UserProduct";

const ROUTES ={
    contact:{
        name:"/contact",
        component:<Contact />
    },
    about:{
        name:"/about",
        component:<About />
    },
    support:{
        name:"/support",
        component:<Support />
    },
    register:{
        name:"/register",
        component:<Register />
    },
    login:{
        name:"/login",
        component:<Login />
    },
    universityAdmin:{
        name:"/universityAdmin",
        component:<University />
    },
    departmentAdmin:{
        name:"/departmentAdmin",
        component:<Department />
    },
    productAdmin:{
        name:"/productAdmin",
        component:<Product />
    },
    home:{
        name:"/",
        component:<Home />
    },
    department:{
        name:"/department",
        component:<Department />
    },
    product:{
        name:"/product",
        component:<UserProduct />
    }
};

export default ROUTES;