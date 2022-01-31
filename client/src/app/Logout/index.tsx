import React, { FC, useState } from "react"
import cn from "classnames"

type Props = {
  signOut: () => void
  users: User
}

const Logout: FC<Props> = ({ signOut, user }) => {
  const [isOpenDropdown, setOpenDropdown] = useState(false)

  return (
    <i
      id="fa-bars-menu"
      className="fa fa-bars"
      aria-hidden="true"
      onClick={() => setOpenDropdown(!isOpenDropdown)}
    >
      <div
        id="logout-dropdown"
        className={cn({ "hidden": !isOpenDropdown})}
      >
        <div id="logout-box-user-display">
          <img src={user.userAvi} alt="Аватар" />
          <div id="logout-box-user-details">
            <p id="logout-box-username">{user.username}</p>
            <p id="logout-box-handle">@{user.username}</p>
          </div>
        </div>
        <button
          type="button"
          id="logout-box-button"
          onClick={signOut}
        >
          Выйти
        </button>
      </div>
    </i>
  )
}

export default Logout
