import mongoose from "mongoose"
import config from "@root/config"

export const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUri,
      {
        connectTimeoutMS: 1000
      }
    )

    console.log("MongoDB connection SUCCESS")
  } catch (error) {
    console.error("MongoDB connection FAIL: ", error)
    process.exit(1)
  }
}
