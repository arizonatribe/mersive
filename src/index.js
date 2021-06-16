import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider } from "styled-components"
import "semantic-ui-css/semantic.min.css"
import "./index.css"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals.js"
import theme from "./components/theme.js"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
