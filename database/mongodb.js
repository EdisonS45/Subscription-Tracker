import mongoose from "mongoose";
import { MONGO_URI } from "../config/env.js";

if(!MONGO_URI){
    throw new Error('You must need a MONGO_URI env variable')
}

const connectToDb = async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("Successfully connected to MongoDB")
    }catch(err){
        console.log('Error connection to MongoDB',err);
        process.exit(1)
    }
}
export default connectToDb