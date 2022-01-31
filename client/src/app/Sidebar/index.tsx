import React, { FC, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { removeTokens } from "@lib/helper"
import { State } from "state/store"
import { LoginContext } from "@app/App/InitialRouting"
import Logout from "@app/Logout"

const Sidebar: FC = () => {
  const navigate = useNavigate()
  const { onLoginStateChange } = useContext(LoginContext)
  const { user } = useSelector((state: State) => state.auth)

  const signOut = async () => {
    removeTokens()
    onLoginStateChange(false)
    navigate("/", { replace: true })
  }

  useEffect(() => {
    if(firstChannel) navigate(`/messages/${firstChannel._id}/details`)
  }, [])

  return (
    <div id="sidebar-container">
      <div id="sidebar-header">
        <h1>SFTPRO Chat</h1>
        <Logout signOut={signOut} user={user}/>
        <i id='fa-online-status' className='fa fa-circle' aria-hidden='true'/>
        <h2>{user.username}</h2>
      </div>
      <ChannelList socket={socket}/>
      <footer id="sidebar-footer">
        <p>Created by Krivonos Aleksandr</p>
      </footer>
    </div>
  )
}

export default Sidebar
