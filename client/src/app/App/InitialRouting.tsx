import React, { createContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useFirstMountState } from "react-use"
import { getToken, removeTokens, setPageTitle } from "lib/helper"
import { routes } from "routes"
import Auth from "@app/Auth"

import App from "./index"

const PAGE_TITLE_PREFIX = "SFTPRO"

export const LoginContext = createContext({
  /* eslint-disable-next-line */
  onLoginStateChange: (isLoginState: boolean) => {}
})

const InitialRouting: React.FC = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const token = getToken()
  const isFirstMount = useFirstMountState()

  const [isLogin, setLoginState] = useState(!!token)

  const onChangeLoginState = (isLoginState: boolean) => {
    setLoginState(isLoginState)
    token && setLoginState(true)
  }

  const signOut = () => {
    removeTokens()
    setLoginState(false)
    navigate("/", { replace: true })
  }

  useEffect(() => {
    setPageTitle({ prefix: PAGE_TITLE_PREFIX, pathname, routes: routes() })
  }, [pathname])

  useEffect(() => {
    if (isFirstMount && !token) signOut()

    if(token) setLoginState(true)
  }, [])

  return (
    <LoginContext.Provider value={{ onLoginStateChange: onChangeLoginState }}>
      {isLogin ?  <App /> : <Auth />}
    </LoginContext.Provider>
  )
}

export default InitialRouting
