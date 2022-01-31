import { RouteItem } from "routes/types"
import Cookies from "universal-cookie"

const COOKIE_DOMAIN = window.location.hostname.includes("wavix.com") ? ".wavix.com" : ""

export const hostname = window.location.hostname.includes("wavix.com") ? "wavix.com" : "wavix-dev.com"

const cookies = new Cookies()

type PageTitleProps = {
  prefix: string
  pathname: string
  routes: Array<RouteItem>
}
type Options = { maxAge: number }

type ExtendedFilter = {
  [key: string]: any
}

type ParamValue = number | string | Array<string> | undefined | boolean | null

export type Params = {
  [key: string]: ParamValue
}

type ParamsOptions = {
  exclude?: Array<string>
  allowEmpty?: Array<string>
}

export const setPageTitle = ({ prefix, pathname, routes }: PageTitleProps) => {
  let title: string = prefix

  const route: RouteItem | undefined = routes.find(routeItem => routeItem.path.includes(pathname))

  if (route?.title) {
    title = `${prefix} - ${route.title}`
  }

  document.title = title
}
export const getToken = () => {
  return cookies.get("token") || null
}
export const setToken = (nameToken: string, value: string, options?: Options) => {
  cookies.set(nameToken, value, { path: "/", domain: COOKIE_DOMAIN, ...options })
}
export const removeRefreshToken = () => {
  cookies.remove("refresh_token", { path: "/", domain: COOKIE_DOMAIN })
}
export const removeToken = () => {
  cookies.remove("token", { path: "/", domain: COOKIE_DOMAIN })
}
export const removeTokens = () => {
  removeRefreshToken()
  removeToken()
}

const paramToQueryString = (key: string, value: ParamValue) => {
  const isArray = Array.isArray(value)

  if (typeof value === "undefined") {
    return ""
  }

  return isArray
    ? `${key}=${encodeURIComponent((value as Array<string>).join(","))}`
    : `${key}=${encodeURIComponent(value as string)}`
}

export const queryString = <T>(query: T) => {
  const queryObj = { ...query } as T & ExtendedFilter
  return Object.keys(query)
    .reduce((acc, key: string) => (queryObj[key] !== "" ? [...acc, paramToQueryString(key, queryObj[key])] : acc), [])
    .filter(param => param)
    .join("&")
}

const removeEmptyParams = (query: Params, allowEmpty: Array<string> = []) => {
  return Object.keys(query).reduce(
    (acc, param) =>
      typeof query[param] !== "boolean" && (!query[param] || query[param] === "unset") && !allowEmpty.includes(param)
        ? acc
        : { ...acc, [param]: query[param] },
    {}
  )
}

export const buildParams = (obj: Params, options?: ParamsOptions) => {
  if (!obj) {
    return ""
  }

  let queryObject: Params = removeEmptyParams(obj, options?.allowEmpty)

  if (options?.exclude) {
    queryObject = Object.keys(queryObject).reduce(
      (acc, param) => (options.exclude?.indexOf(param) === -1 ? { ...acc, [param]: queryObject[param] } : acc),
      {}
    )
  }

  return Object.keys(queryObject)
    .reduce((acc, key: string) => (obj[key] !== "" ? [...acc, paramToQueryString(key, obj[key])] : acc), [])
    .join("&")
}

export const selectChannels = (state: any, isPrivate: boolean) => {
  return Object
    .keys(state.channels.channels)
    .map(key => state.channels.channels[key])
    .filter(channel => channel.private === isPrivate)
}

export const selectMessages = (state: any) => {
  // @ts-ignore
  return Object.keys(state.messages.messages).map(key => state.messages.messages[key]).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
}
