// import mongoose from "mongoose";

// export const connectDB = async () => {
//   const { connection } = await mongoose.connect(process.env.MONGO_URI);
//   console.log(`Databse is connected with ${connection.host}`);
// };

module.exports = {
  MONGODB_URI: "mongodb://localhost:27017/ticket-manager",
};
