
const bcrypt=require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require("../models/userModel");
const Driver = require("../models/driverModel");

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




const registerDriver = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      phoneNumber,
      serviceArea,
      vehicleNumber,
      licenseNumber,
      vehicleType,
    } = req.body;

    // Check if driver already exists
    const existingDriver = await Driver.findOne({ username });
    if (existingDriver) {
      return res.status(400).json({ message: "Driver already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create driver
    const newDriver = new Driver({
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      serviceArea,
      vehicleNumber,
      licenseNumber,
      vehicleType,
    });

    await newDriver.save();

    res.status(201).json({
      message: "Driver registered successfully",
      driver: {
        id: newDriver._id,
        username: newDriver.username,
        email: newDriver.email,
        role: "driver"
      },
    });
  } catch (error) {
    console.error("Error registering driver:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
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
    registerUser,
    registerDriver
};