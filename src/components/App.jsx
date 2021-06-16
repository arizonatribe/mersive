import React, { useState } from "react"
import { Page, Header, MessageWrapper, Main } from "./Layout"
import { WithAuthentication } from "./WithAuthentication"
import { Devices } from "./Devices"

/**
 * The main component (or entry point) for the React App
 *
 * @function
 * @name App
 * @returns {React.Component} The rendered JSX component
 */
function App() {
  const [token, setToken] = useState("")
  const [message, setMessage] = useState("")

  return (
    <WithAuthentication
      token={token}
      setToken={setToken}
      setMessage={setMessage}
    >
      <Page>
        <Header>
          <MessageWrapper hasMessage={!!message}>
            {message}
          </MessageWrapper>
        </Header>
        <Main>
          <Devices token={token} setMessage={setMessage} />
        </Main>
      </Page>
    </WithAuthentication>
  )
}

export default App
