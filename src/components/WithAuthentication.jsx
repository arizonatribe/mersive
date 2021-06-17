import PropTypes from "prop-types"
import React, { useEffect } from "react"

import { Login } from "./Login"
import { verifyToken } from "./api/index.js"
import { decodeJwt } from "../helpers/index.js"

/**
 * A component with ensures the children component(s) are not rendered unless the user is authenticated
 *
 * @function
 * @name WithAuthentication
 * @param {string} [token] The current access token for the user's authenticated session
 * @param {React.Element} props.children The children component(s) to render
 * @param {function} props.setToken A callback function which updates the current access token
 * @param {function} props.setMessage A callback function which places auth errors into the header
 * @returns {React.Component} The rendered JSX component
 */
function WithAuthentication({ token, children, setToken, setMessage }) {
  useEffect(() => {
    if (!token) {
      /* Login places the token into local storage (if "remember me" was checkmarked), so auth verification can be bootstrapped that way */
      const accessToken = localStorage.getItem("token")

      /* Let the next re-render catch the change to `token` and invoke `verifyToken() */
      if (accessToken) setToken(accessToken)
    } else {
      verifyToken(token)
        .then(() => {
          /* When the token expires, the user should sign back in */
          setTimeout(() => {
            setToken("")
          }, decodeJwt(token).exp * 1000)
        })
        .catch(err => {
          setMessage(err.message)
          localStorage.removeItem("token")
          setToken("")
        })
    }
  }, [token, setMessage, setToken])

  return token ? children : <Login setToken={setToken} />
}

WithAuthentication.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}

export { WithAuthentication }
