import React, { FC, useContext, useEffect, useRef, useState } from "react"
import { useDispatch } from "react-redux"
import config from "config"
import API from "@lib/api"
import * as actions from "state/actions/auth"
import { removeTokens, setToken } from "@lib/helper"
import { LoginContext } from "@app/App/InitialRouting"
import { validateFormData } from "@app/Auth/helpers"
import { ErrorsData } from "@app/Auth/types"
import rules from "@app/Auth/rules"

type AuthStateProps = {
  username: string
  password: string
  confirmPassword?: string
}

const Auth: FC = () => {
  const [formData, setFormData] = useState<AuthStateProps>({
    username: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState<ErrorsData>({})
  const [isLoading, setLoading] = useState(false)
  const [haveAccount, setHaveAccount] = useState(false)

  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const dispatch = useDispatch()

  const { onLoginStateChange } = useContext(LoginContext)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const demoLogin = async () => {
    const timeout = 50
    const username: Array<string> = "richard".split("")
    const password: Array<string> = "richard".split("")
    let newVal: Array<string> = []

    const usernameInput = usernameRef && usernameRef.current
    const passwordInput = passwordRef && passwordRef.current

    const slowUserInput = setInterval(() => {
      newVal.push(usernameInput && usernameInput.value + username.shift() || "")
      setFormData({ ...formData, username: newVal.join("") })

      if (username.length === 0) {
        window.clearInterval(slowUserInput)
        newVal.length = 0

        const slowPassInput = setInterval(() => {
          newVal.push(passwordInput && passwordInput.value + username.shift() || "")
          setFormData({ ...formData, password: newVal.join("") })

          if (password.length === 0) {
            window.clearInterval(slowPassInput)
            newVal = []

            if (username.length === 0 && password.length === 0) onSubmit()
          }
        }, timeout)
      }
    }, timeout)
  }

  const onSubmit = async (e?: React.SyntheticEvent) => {
    e?.preventDefault()
    const validation = validateFormData(formData, rules)
    setErrors(validation.errors)

    const haveErrors = Object.values(errors).some(error => {
      return error.toString().length > 0
    })

    setLoading(true)

    if (!haveErrors) {
      delete formData.confirmPassword
      dispatch(actions.getCurrentUserRequest())

      const url = haveAccount ? config.paths.auth : config.paths.register

      try {
        const response = await API.post(url, formData)

        if (response.data.token) {
          const { token, token_ttl } = response.data

          setToken("token", token, { maxAge: token_ttl })
          dispatch(actions.getCurrentUserSuccess(response.data.user))
          onLoginStateChange(true)
          setLoading(false)
        }
      } catch {
        setErrors({ username: "??????-???? ?????????? ???? ??????, ?????????????????? ???????????????????????? ?????????????????????? ??????????" })
        setLoading(false)
        dispatch(actions.getCurrentUserFail())
        removeTokens()
      }
    }
  }

  useEffect(() => {
    setErrors({ ...errors, username: "", password: "", confirmPassword: "" })
  }, [formData.username, formData.password, formData.confirmPassword])

  return (
    <section className="splash-container">
      <div className="splash-wrapper">
        <img alt="??????" src="https://res.cloudinary.com/tisai/image/upload/v1643539015/chat_yl7091.png" />
        <h1 className="welcome-page-header">SFTPRO ??????</h1>
        <h2 className="welcome-page-subheading">?????????? ?????? ???????????????????? ????????????</h2>
        {errors && Object.values(errors).some(error => {
          return error.toString().length > 0
        }) &&
        <ul className="auth-signup-errors">
          <li className="error-message">{errors[Object.keys(errors)[0]]}</li>
        </ul>
        }

        {haveAccount &&
        <div
          id="splash-guest-button"
          className="splash-button"
          onClick={demoLogin}>??????????</div>
        }

        <form className="auth-form" onSubmit={onSubmit}>
          <label htmlFor="username">?????? ????????????????????????:</label>
          <input type="text"
                 className="auth-user-input"
                 name="username"
                 placeholder="?????????????? ?????? ????????????????????????"
                 ref={usernameRef}
                 value={formData.username}
                 onChange={onInputChange} />
          <label htmlFor="password">????????????:</label>
          <input type="password"
                 name="password"
                 placeholder="?????????????? ????????????"
                 className="auth-pass-input"
                 ref={passwordRef}
                 value={formData.password}
                 onChange={onInputChange} />
          {!haveAccount && <>
            <label htmlFor="confirmPassword">?????????????????????? ????????????:</label>
            <input
              type="password"
              name="confirmPassword"
              className="auth-pass-input"
              placeholder="?????????????????????? ????????????"
              onChange={onInputChange} />
          </>}
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            className="splash-button splash-button__form"
            type="submit"
            disabled={isLoading}
          >
            {haveAccount ? "??????????" : "????????????????????????????????????"}
          </button>
        </form>
        {haveAccount ?
          <span className="auth-redirect-links">
            ?????????? ??????????????? <span onClick={() => setHaveAccount(false)}>??????????????????????????????????</span>
          </span> :
          <span className="auth-redirect-links">
            ?????? ???????? ??????????????? <span onClick={() => setHaveAccount(true)}>??????????????</span>
          </span>
        }
      </div>
    </section>
  )
}

export default Auth
