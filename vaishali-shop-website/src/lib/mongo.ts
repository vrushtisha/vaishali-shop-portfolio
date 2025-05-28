import mongoose from 'mongoose';

const MONGODB_URI=process.env.MONGO_URI as string;

if(!MONGODB_URI){
    throw new Error('Please define MONGO_URI');
}

const connectToDatabse=async()=>{
    if(mongoose.connection.readyState>=1) return;

    try{
        await mongoose.connect(MONGODB_URI);
        console.log("db connected");

    }catch(error){
        console.error("Error connecting to database",error);

    }
};

export default connectToDatabse;
