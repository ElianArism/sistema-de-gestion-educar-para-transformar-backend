import mongoose from "mongoose"

export const connectDB = async () => {
  try {
    if (!process.env.CONN_STR)
      throw new Error("Connection String not found in .env")
    await mongoose.connect(process.env.CONN_STR)
    console.log("DB running!")
  } catch (error) {
    console.log("Error trying to connect to DB", error)
  }
}
