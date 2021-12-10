import express from "express"
import logger from "morgan"
import cookieParser from "cookie-parser"
import compress from "compression"
import methodOverride from "method-override"
import cors from "cors"
import httpStatus from "http-status"
import requestIp from "request-ip"
import expressValidation from "express-validation"
import helmet from "helmet"
import siteRoutes from "@root/api/routes"
import config from "@config/index"
import ApiError from "@helpers/api-error"
import { connectDB } from "@database/connect"
import "./socket/client"

const app = express()

if (config.env === "development") {
  app.use(logger("dev") as express.RequestHandler)
}

connectDB()

app.enable("trust proxy")
app.use(requestIp.mw())

// parse body params and attache them to req.body
app.use(express.json({ limit: config.limitRequestBody }) as express.RequestHandler)

app.use(cookieParser())
app.use(compress())
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet() as express.RequestHandler)

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use(`/api/${config.apiVersion}/`, siteRoutes)

app.use("/api/admin/health-check", (req: express.Request, res: express.Response) => {
  res.json({ success: true })
})

// if error is not an instanceOf APIError, convert it.
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.error
    const error = new ApiError(unifiedErrorMessage, err.statusCode, true)
    return next(error)
  } else if (!(err instanceof ApiError)) {
    const apiError = new ApiError(err.message, err.status, err.isPublic)
    return next(apiError)
  }
  return next(err)
})

// catch 404 and forward to error handler
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (config.env === "development") {
    const err = new ApiError("API not found", httpStatus.NOT_FOUND)
    return next(err)
  }

  res.status(httpStatus.NOT_FOUND).json({ success: false, message: "Not found" })
  return next()
})

// error handler, send stacktrace only during development
if (config.env === "development") {
  app.use((err: any, req: express.Request, res: express.Response) =>
    res.status(err.status).json({
      message: err.isPublic ? err.message : httpStatus[err.status]
      // stack: err.stack
    })
  )
} else {
  app.use((err: any, req: express.Request, res: express.Response) =>
    res.status(err.status).json({
      message: err.isPublic ? err.message : httpStatus[err.status]
    })
  )
}

export default app
