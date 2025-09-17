const express=require("express");
require("dotenv").config();
const dbConnect=require("./config/dbConnect");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
dbConnect();

const app=express();
const PORT= process.env.PORT || 7002;

//middleware

app.use(express.json());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
//start the server
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});