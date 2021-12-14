import dotenv from "dotenv"

import { DB } from "@database/entity"
import { orderSeeds } from "@database/seeds"
import { connectDB } from "@database/connect"
import async from "async"

dotenv.config()

const importData = async () => {

  if (process.env.NODE_ENV !== "test") return

  await connectDB()
    .then(async () => {
      console.log()

      for (const seed of orderSeeds) {
        const { model, data, initMethod} = seed

        console.log("Seed model: ", model.modelName)

        await model.deleteMany()
        if (initMethod) await initMethod()
        await model.insertMany(data)
      }

      console.log("\n*** DATA IMPORT SUCCESS ***")
    })

  process.exit()
}

importData()
