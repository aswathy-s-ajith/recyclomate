const mongoose=require('mongoose');

const dbConnect = async() => {
    try{
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`DB connected to: ${connect.connection.host}`);
    }
    catch(err){
        console.error("Database connection failed:", err);
        process.exit(1);
    }
};

module.exports = dbConnect;