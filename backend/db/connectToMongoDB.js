import mongoose from "mongoose";

const connectToMonogoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB", error.message);
    // process.exit(1); // Exit
  }
};

export default connectToMonogoDB;