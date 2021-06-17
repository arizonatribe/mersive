import React, { useState, useEffect } from "react"

import { Page, Header, MessageWrapper, Main } from "./Layout"
import { WithAuthentication } from "./WithAuthentication"
import { DeviceUpdates } from "./DeviceUpdates"
import { Logo } from "./Logo"

/**
 * The main component (or entry point) for the React App
 *
 * @function
 * @name App
 * @returns {React.Component} The main component for the React application
 */
function App() {
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 5000)
    }
  }, [message])

  return (
    <WithAuthentication
      token={token}
      setToken={setToken}
      setMessage={setMessage}
    >
      <Page>
        <Header>
          <Logo isDark />
          <MessageWrapper hasMessage={!!message}>
            {message}
          </MessageWrapper>
        </Header>
        <Main>
          <DeviceUpdates token={token} setMessage={setMessage} />
        </Main>
      </Page>
    </WithAuthentication>
  )
}

export default App
