import dotenv from "dotenv"
import path from "path"
import async from "async"

import config from "@config/index"
import {DB} from "@database/entity"
import {orderSeeds} from "@database/seeds"
import {connectDB} from "@database/connect"
import mongoose from "mongoose";

interface Model {
  model: string
  data: Array<any>
}

dotenv.config()

const getSeedOrder = (orderSeeds: Array<string>) =>
  orderSeeds.reduce((acc: Array<string>, seed: string) => {
    const seedsDir = path.normalize(`${__dirname}/seeds`)
    const seedFile = path.join(seedsDir, `${seed}.ts`)
    return [...acc, seedFile]
  }, [])

const importData = async () => {

  if (process.env.NODE_ENV !== "test") return

  await connectDB()
    .then(async () => {
        const seedModelsOrder = getSeedOrder(orderSeeds)
        const seeds: { model: any; data: any }[] = []

        // const modelList = seedModelsOrder.map(
        //   async seedFile =>
        //     new Promise((resolve, reject) => {
        //       import(seedFile)
        //         .then(item => {
        //           if (item && item.default && item.default.model) {
        //             const {model, data} = item.default
        //             console.log("data: ", model, data)
        //             seeds.push({model, data})
        //             resolve({model, data})
        //           } else {
        //             resolve({})
        //           }
        //         })
        //         .catch(e => {
        //           console.log("E", e)
        //           reject()
        //         })
        //     })
        // )
        //
        // console.log(seeds)
        // Promise.all(modelList).then(models => {
        //   console.log(models)
        //   const modelsQueue = models as Array<Model>
        //
        //   modelsQueue.forEach(async (item: Model) => {
        //     try {
        //       console.log("Seed model - ", item.model)
        //       await DB[item.model].deleteMany({})
        //       await DB[item.model].insertMany(item.data)
        //     } catch (err) {
        //       console.log("err", err)
        //     }
        //   })
        // })

        const modelList = seedModelsOrder.map(
          async seedFile =>
            await import(seedFile)
              .then(item => {
                if (item && item.default && item.default.model) {
                  const {model, data} = item.default
                  console.log(item.default)
                  seeds.push({model, data})
                  return {model, data}
                }
              })
              .catch(e => {
                console.log("E", e)
                return {}
              })
        )
      console.log(seeds)

        // console.log()
        // modelList.map(async models => {
        //   console.log(await models)
        // const modelsQueue = models as Array<Model>
        //
        // modelsQueue.forEach(seedModel => {
        //   console.log("Seed model - ", seedModel.model)
        // })
        //
        // async.mapSeries(
        //   modelsQueue,
        //   async (item: Model) => {
        //     try {
        //       await DB[item.model].deleteMany({}).exec()
        //       await DB[item.model].insertMany(item.data).exec()
        //     } catch (err) {
        //       console.log("err", err)
        //     }
        //   }
        // )
        //
        // console.log(" ")
        // })

        console.log("*** DATA IMPORT SUCCESS ***")
      }
    )
    .catch(e => console.log("E", e))

  process.exit()
}

importData()
