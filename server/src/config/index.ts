import Joi from "joi"
import dotenv from "dotenv"

dotenv.config()

type Config = {
  env: string
  port: string
  socketPort: string
  socketServer: string
  apiVersion: string
  jwtSecret: string

  limitRequestBody: number

  queuesPort: number
  jwtTTL: number
  refreshTokenTTL: number
  listLimitMin: number
  listLimitMax: number
  databaseUri: string
}

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().default(3000).description("App Port"),
  SOCKET_SERVER_PORT: Joi.number().default(8001).description("Socket server Port"),
  SOCKET_SERVER: Joi.string().default("ws://127.0.0.1:8001").description("Socket server Url"),
  API_VERSION: Joi.string().default("1.1").description("API Version"),
  JWT_SECRET: Joi.string().required().description("JWT Secret required to sign"),
  DB_PASSWORD: Joi.string().required().description("PASWORD TO CONNECT DATABASE"),
})
  .unknown()
  .required()

const { error, value: envVars } = envVarsSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  socketPort: envVars.SOCKET_SERVER_PORT,
  socketServer: envVars.SOCKET_SERVER,
  apiVersion: envVars.API_VERSION,
  jwtSecret: envVars.JWT_SECRET,

  databaseUri: `mongodb+srv://tiSai:${envVars.DB_PASSWORD}@messengercluster.np9w9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,

  limitRequestBody: 50 * 1024 * 1024,

  queuesPort: 3025,
  jwtTTL: 900,
  refreshTokenTTL: 5184000,
  listLimitMin: 25,
  listLimitMax: 100
}

export default config
