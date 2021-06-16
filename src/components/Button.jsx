import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { PropTypesTheme } from "./theme.js"

const StyledButton = styled.button`
  padding: 1em;
  display: block;
  text-align: center;
  text-decoration: none;
  text-shadow: 2px 2px 4px darkgray;
  opacity: ${p => (p.disabled ? 0.5 : 1)};
  color: ${p => p.theme?.colors?.textColor};
  background-color: ${p => p.theme?.colors?.primary};
  cursor: ${p => (p.disabled ? "not-allowed" : "pointer")};

  border: none;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`

StyledButton.propTypes = {
  disabled: PropTypes.bool,
  theme: PropTypesTheme
}

/**
 * A reusable base button component
 *
 * @function
 * @name Button
 * @param {string} props.type The type of button (ie, 'button', 'submit')
 * @param {string} [props.name] The form element name for the button
 * @param {boolean} [props.disabled] Whether or not the button is disabled
 * @param {PropTypes.element} props.children Content to render inside the button (usually a label, but can be another HTML element)
 * @returns {React.Component} The rendered JSX component
 */
function Button({ type, name, disabled, children }) {
  return (
    <StyledButton
      name={name}
      disabled={disabled}
      type={/^submit$/i.test(type) ? "submit" : "button"}
    >
      {children}
    </StyledButton>
  )
}

Button.propTypes = {
  name: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(["button", "submit"]),
  children: PropTypes.element.isRequired
}

Button.defaultProps = {
  disabled: false,
  type: "button"
}

export { Button, StyledButton }
