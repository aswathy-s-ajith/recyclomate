const express=require("express");

const {registerUser,registerDriver, login} =require("../controller/authController")
const router=express.Router();

router.post("/register-user",registerUser);
router.post("/register-driver",registerDriver);
router.post("/login",login);

module.exports=router;