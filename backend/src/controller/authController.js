
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Driver = require("../models/driverModel");

const register = async (req, res) => {
  try {
    const { 
      username, 
      email, 
      password, 
      phoneNumber, 
      role,
      // User specific fields
      address,
      // Driver specific fields
      serviceArea,
      vehicleNumber,
      licenseNumber,
      vehicleType
    } = req.body;

    // Check if user/driver already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    const existingDriver = await Driver.findOne({ $or: [{ username }, { email }] });
    
    if (existingUser || existingDriver) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role.toLowerCase() === 'user') {
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        addresses: address ? [address] : [],
        role: "user",
      });

      await newUser.save();
      res.status(201).json({ 
        message: `User registered with username ${username}`,
        user: {
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          role: "user"
        }
      });
    } else if (role.toLowerCase() === 'driver') {
      const newDriver = new Driver({
        username,
        email,
        password: hashedPassword,
        phoneNumber,
        serviceArea,
        vehicleNumber,
        licenseNumber,
        vehicleType,
        role: "driver"
      });

      await newDriver.save();
      res.status(201).json({
        message: "Driver registered successfully",
        driver: {
          id: newDriver._id,
          username: newDriver.username,
          email: newDriver.email,
          role: "driver"
        }
      });
    } else {
      return res.status(400).json({ message: "Invalid role specified" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong during registration" });
  }
};



const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Decide which collection to check based on role
    let account;
    if (role === "user") {
      account = await User.findOne({ username });
    } else if (role === "driver") {
      account = await Driver.findOne({ username });
    } 
    else if(role=="admin"){
      account=await User.findOne({username , role:"admin"});
    }
    else {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Account not found
    if (!account) {
      return res.status(404).json({ message: `${role} not found` });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: account._id, role: account.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: `${role} login successful`,
      token,
      user: {
        id: account._id,
        username: account.username,
        role: account.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Something went wrong during login" });
  }
};


module.exports = {
    login,
    register
};