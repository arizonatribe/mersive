import React from "react"
import PropTypes from "prop-types"
import styled, { withTheme } from "styled-components"
import { PropTypesTheme } from "./theme.js"

const ErrorMessage = styled.div`
  background: ${p => p.theme.colors.backgroundColor};
  color: ${p => (p.theme.colors.red || "red")};
  font-size: 12px;
  font-family: ${p => p.theme.fontFamily || "Helvetica"};
  text-align: center;
`

ErrorMessage.propTypes = {
  theme: PropTypesTheme
}

const ErroMessageWithCloseIcon = styled(ErrorMessage)`
  position: relative;
  padding: 15px;
  display: block;
  cursor: pointer;

  &:after {
    content: '${"\u2715"}';
    color: ${p => p.theme.colors.white || "white"};
    position: absolute;
    top: 4px;
    right: 4px;
    margin: 0;
    padding: 0;
    font-size: 8px;
    line-height: 8px;
    background: transparent;
  }
`

/**
 * An error message component which can be cleared manually by the user
 *
 * @function
 * @name ClearableError
 * @param {string} [props.error] The error message itself
 * @param {function} props.clearError The callback function that clears the error
 * @returns {React.Component|null} The rendered error message component
 */
function Clearable({ error, clearError }) {
  if (!error) return null

  return (
    <ErroMessageWithCloseIcon onClick={clearError}>
      {error}
    </ErroMessageWithCloseIcon>
  )
}

Clearable.propTypes = {
  error: PropTypes.string,
  clearError: PropTypes.func.isRequired
}

export const ClearableError = withTheme(Clearable)

export { ErrorMessage, ErroMessageWithCloseIcon }
