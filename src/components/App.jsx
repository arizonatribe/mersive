/* eslint-disable no-console */
import React, { useEffect, useState } from "react"
import { verifyToken } from "./api/index.js"
import { Devices } from "./Devices"
import { Login } from "./Login"

/**
 * The main component (or entry point) for the React App
 *
 * @function
 * @name App
 * @returns {React.Component} The rendered JSX component
 */
function App() {
  const [token, setToken] = useState("")

  /**
   * Checks to see if there's an auth token and if it's still valid
   *
   * @function
   * @name checkToken
   */
  async function checkToken() {
    try {
      const accessToken = localStorage.getItem("token")
      await verifyToken(accessToken)
      setToken(accessToken)
    } catch (err) {
      setToken("")
    }
  }

  useEffect(() => {
    checkToken()
  }, [])

  return (token ? <Devices /> : <Login setToken={setToken} />)
}

export default App
