// import mongoose from "mongoose";

// const connectdb = async()=>{
//     try{
//         const conn = await mongoose.connect(process.env.MONGODB_URI)
//         console.log("successfully connected to mongodb")
//     }
//     catch(error){
//         console.log(`Mongodb error : ${error}`)
//     }
// }

// export default connectdb


import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const connectdb = async () => {
    try {
        const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/CollegeDB";
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`✅ Connected to MongoDB at: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1); // Stop the app if DB connection fails
    }
};

export default connectdb;
