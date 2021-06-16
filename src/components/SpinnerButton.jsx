import PropTypes from "prop-types"
import styled from "styled-components"
import { StyledButton } from "./Button"

const SpinnerButton = styled(StyledButton)`
  position: relative;
  ${props => props.inProgress && "opacity: 0.9;"}
  ${props => props.inProgress && `background: ${props.theme.colors.gray || "gray"};`}
  ${props => props.inProgress && `color: ${props.theme.colors.darkGray || "darkgray"};`}

  @keyframes spinner {
    to {transform: rotate(360deg);}
  }
     
  &:before {
    ${props => props.inProgress && `
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      width: ${props.size}px;
      height: ${props.size}px;
      margin-top: -${props.size / 2}px;
      margin-left: -${props.size / 2}px;
      border: 2px solid ${props.theme.colors.lightGray || "lightgray"};
      border-top-color: ${props.theme.colors.secondary};
      animation: spinner .6s linear infinite;
    `}
  }
`

SpinnerButton.propTypes = {
  inProgress: PropTypes.bool,
  size: PropTypes.number
}

SpinnerButton.defaultProps = {
  inProgress: false,
  size: 32
}

export { SpinnerButton }
