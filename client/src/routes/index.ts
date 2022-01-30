import { RouteItem } from "@routes/types"
import { mainRoutes } from "@routes/mainRoutes"

export const routes = (): Array<RouteItem> => {
  return [...mainRoutes()]
}
