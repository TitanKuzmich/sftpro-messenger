import { connectDB } from "./src/database/connect"

const before = async () => {
  await connectDB()
}

export default before
