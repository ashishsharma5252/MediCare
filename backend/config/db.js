import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://Ashish:0ikzS4Glj4jqk05D@cluster0.57gyvuc.mongodb.net/MediCare").then(()=>{
        console.log("Connected to MongoDB");
    })
}