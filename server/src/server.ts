import "./aliases"
import app from "@root/app"
import config from "@config/index"

app.listen(config.port, () => {
  console.log("Backend server port:", config.port)
})
