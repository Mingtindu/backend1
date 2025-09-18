import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // await mongoose.connect("mongodb+srv://sangitaneupane487_db_user:Hello@cluster0.iafpq7h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    await mongoose.connect("mongodb://localhost:27017/MERN");
    console.log("MONGODB CONNECTED");
  } catch (error) {
    console.log("Error While connecting DB", error.message);
  }
};

export { connectDB };
