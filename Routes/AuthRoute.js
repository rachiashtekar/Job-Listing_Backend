const express = require("express")
const
{registerController ,
  loginController,

} = require("../Controllers/AuthControllers")


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//User profile



module.exports=router;