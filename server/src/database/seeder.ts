import dotenv from "dotenv"

import { DB } from "@database/entity"
import { orderSeeds } from "@database/seeds"
import { connectDB } from "@database/connect"
import async from "async"

dotenv.config()

const importData = async () => {

  if (process.env.NODE_ENV !== "test") return

  // const seeds: any[] = []

  await connectDB()
    .then(() => {
      orderSeeds.forEach(async ({ model, data }) => {
        console.log("Seed model - ", model)

        const user = await model.findOne({where: {username: "queen_cersei"}})
        console.log(user)
        // await DB[model].deleteMany({})
        // await DB[model].insertMany(data)
      })

      console.log("*** DATA IMPORT SUCCESS ***")
    })



  // .then(() => {
  // const seedModelsOrder = getSeedOrder(orderSeeds)
  //
  // async.mapSeries(
  //   seedModelsOrder,
  //   async seedFile => {
  //     // const module = await import(seedFile)
  //     await import(seedFile).then(async (module) => {
  //       if (module && module.default && module.default.model) {
  //         const { model, data } = module.default
  //       }
  //       seeds.push(await module.default)
  //     })
  //   },
  //   () => {
  //     async.mapSeries(
  //       seeds,
  //       async ({ model, data }) => {
  //         console.log("Seed model - ", model)
  //
  //         await DB[model].deleteMany({})
  //         await DB[model].insertMany(data)
  //       },
  //       () => {
  //         console.log("*** DATA IMPORT SUCCESS ***")
  //       })
  //   }
  // )

  // seedModelsOrder.map(
  //   async seedFile => {
  //     // const module = await import(seedFile)
  //     await import(seedFile).then(async (module) => {
  //       if (module && module.default && module.default.model) {
  //         const { model, data } = module.default
  //       }
  //       seeds.push(await module.default)
  //     })

  // .then(async item => {
  //   if (item && item.default && item.default.model) {
  //     const { model, data } = item.default
  //
  //     console.log("Seed model - ", item.model)
  //
  //     await DB[model].deleteMany({})
  //     await DB[model].insertMany(data)
  //
  //     console.log("*** DATA IMPORT SUCCESS ***")
  //   }
  // })
  // .catch(e => {
  //   console.log("E", e)
  //   return {}
  // })
  // }
  // )
  //   }
  // )
  // .then(() => {
  //   async.mapSeries(
  //     seeds,
  //     async ({ model, data }) => {
  //       console.log("Seed model - ", model)
  //
  //       await DB[model].deleteMany({})
  //       await DB[model].insertMany(data)
  //     },
  //     () => {
  //       console.log("*** DATA IMPORT SUCCESS ***")
  //     })
  // })

  // .then(() => {
  //   console.log(seeds)
  //   seeds.forEach(async ({ model, data }) => {
  //
  //     console.log("Seed model - ", model)
  //
  //     await DB[model].deleteMany({})
  //     await DB[model].insertMany(data)
  //   })
  //
  //   console.log("*** DATA IMPORT SUCCESS ***")
  // })
  // .catch(e => console.log("E", e))

  process.exit()
}

importData()
