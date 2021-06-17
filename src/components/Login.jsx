import React, { useState } from "react"
import PropTypes from "prop-types"
import styled, { withTheme } from "styled-components"

import { SpinnerButton } from "./SpinnerButton"
import { ClearableError } from "./ErrorMessage"
import { Logo } from "./Logo"
import { loginUser } from "./api/index.js"

const Wrapper = styled.div`
  @supports not (display: grid) {
    display: flex;
  }

  @supports (display: grid) {
    display: grid;
  }

  align-items: center;
  height: 100%;
  width: 100%;
`

const FormField = styled.input`
  border-radius: 2px;
  border: 1px solid #ccc;
  padding: 12px;
`

export const StyledLoginForm = styled.form`
  font-family: ${props => props.theme.font.family};
  font-size: 18px;

  & > * {
    margin: 5px;
    &:focus {
      outline: none;
    }
  }

  & .loginHeader > * {
    margin: 30px auto 15px auto;
  }

  & .loginButton {
    text-align: center;
  }

  & .rememberMe input[type=checkbox] {
    margin-right: 10px;
  }

  & label {
    color: white;
  }

  @supports not (display: grid) {
    .loginHeader,
    .logo,
    .email,
    .rememberMe,
    .loginButton {
      max-width: 50em;
      margin: 0 auto;
    }
  }

  @supports (display: grid) {
    display: grid;

    @media ${p => p.theme.breakpoints.phone || "screen and (max-width: 599px)"} {
      grid-template-columns: 50px 1fr 50px;
    }

    @media ${p => p.theme.breakpoints.tablet || "screen and (min-width: 600px)"} {
      grid-template-columns: 200px 1fr 200px;
    }

    @media ${p => p.theme.breakpoints.tabletLandscape || "screen and (min-width: 900px)"} {
      grid-template-columns: 350px 1fr 350px;
    }

    @media ${p => p.theme.breakpoints.desktop || "screen and (min-width: 1200px)"} {
      grid-template-columns: 650px 1fr 650px;
    }

    grid-template-areas:
      '. header .'
      '. logo .'
      '. email .'
      '. password .'
      '. remember-me .'
      '. login-button .';

    & .loginHeader {
      grid-area: header;
    }

    & .email {
      grid-area: email;
    }

    & .password {
      grid-area: password;
    }

    & .rememberMe {
      grid-area: remember-me;
    }

    & .loginButton {
      grid-area: login-button;
    }
  }
`

/**
 * A user sign-in component which collects credentials and sets the access token (on successful login)
 *
 * @function
 * @name Login
 * @param {function} [props.setToken] An optional callback to set the token in the parent component
 * @returns {React.Component} The rendered login component
 */
function LoginForm({ setToken }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [inProgress, setProgress] = useState(false)
  const [rememberMe, setStoragePreference] = useState(false)
  const [authErrorMessage, setAuthErrorMessage] = useState("")

  /**
   * An async function which executes the remote call to sign in the user with the collected credentials
   *
   * @function
   * @name login
   * @param {Event} e The form event
   */
  async function login(e) {
    e.preventDefault()
    setAuthErrorMessage("")

    try {
      setProgress(true)
      const accessToken = await loginUser(email, password)
      if (rememberMe) {
        localStorage.setItem("token", accessToken)
      }
      if (typeof setToken === "function") {
        setToken(accessToken)
      }
    } catch (err) {
      setAuthErrorMessage(err.message)
    }
    setProgress(false)
  }

  return (
    <Wrapper>
      <StyledLoginForm onSubmit={login}>
        <header className="loginHeader">
          <ClearableError
            error={authErrorMessage}
            clearError={() => setAuthErrorMessage("")}
          />
        </header>
        <Logo />
        <FormField
          id="LoginForm-email"
          className="email"
          placeholder="email"
          name="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <FormField
          id="LoginForm-password"
          className="password"
          placeholder="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label className="rememberMe" htmlFor="LoginForm-rememberMe">
          <FormField
            id="LoginForm-rememberMe"
            label="Remember me"
            type="checkbox"
            name="rememberMe"
            checked={rememberMe}
            value={rememberMe}
            onChange={() => setStoragePreference(!rememberMe)}
          />
          Remember me
        </label>
        <SpinnerButton inProgress={inProgress} className="loginButton" type="submit">
          Log in
        </SpinnerButton>
      </StyledLoginForm>
    </Wrapper>
  )
}

LoginForm.propTypes = {
  setToken: PropTypes.func
}

export const Login = withTheme(LoginForm)
