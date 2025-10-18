
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/userModel");


// register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, address } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address,
      role: "user",
    });

    await newUser.save();
    res.status(201).json({ message: `User registered with username ${username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong during user registration" });
  }
};

// register driver
const registerDriver = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, region } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser)
      return res.status(400).json({ message: "Username or email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new User({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      address: region, 
      role: "driver",
    });

    await newDriver.save();
    res.status(201).json({ message: `Driver registered with username ${username}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong during driver registration" });
  }
};

const login = async (req, res) => {
try{
    const {username , password , role} = req.body;
    const user=await User.findOne({username});

    if(!user){
        return res.status(404).json({message: `user not found`});

    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({message:`invalid credentials`});
    }

    const token = jwt.sign(
        {id:user._id,role:user.role},process.env.JWT_SECRET,
    {expiresIn: "1h"})
    res.status(200).json({token});
}catch(err){
    res.status(500).json({message:`something went wrong`});
    console.error("Login Error:", err); // Log the actual error
    res.status(500).json({message:`Something went wrong during login.`});
}
    
};

module.exports = {
    login,
    registerUser,
    registerDriver
};