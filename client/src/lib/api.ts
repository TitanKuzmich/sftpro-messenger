import axios from "axios"
import { getToken } from "lib/helper"
import config from "config"

const API_DOMAIN = process.env.API_DOMAIN || ""

const instance = axios.create({
  baseURL: `${API_DOMAIN}${config.baseUrl}`,
  headers: {
    Accept: "application/json"
  }
})

instance.interceptors.request.use(data => {
  const token = getToken()
  const headers = {
    ...data.headers,
    "Authorization": token ? `Bearer ${token}` : "",
    "Fallback-Watch": !(data.params?.fallback === false)
  }

  const newData = { ...data, params: {} }

  return { ...newData, headers }
})

instance.interceptors.response.use(
  response => response,
  error => {
    const fallback = error.response ? error.response.config.headers["Fallback-Watch"] : false

    if (fallback) {
      let errorMessage: string = ""

      if (typeof error.response.data.error === "string") errorMessage = error.response.data.error

      if (!errorMessage && typeof error.response.data.message === "string") errorMessage = error.response.data.message

      console.log(errorMessage)
    }

    return Promise.reject(error)
  }
)

export default instance
