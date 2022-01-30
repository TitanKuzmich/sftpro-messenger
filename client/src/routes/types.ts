import React from "react"

export type RouteItem = {
  path: string
  title: string
  slug: string
  hidden?: boolean
  subRoutes?: RouteItem[]
  component?: React.FC | React.ComponentClass
}

export type RedirectType = {
  from: string
  to: string
}
