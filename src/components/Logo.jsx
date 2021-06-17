import PropTypes from "prop-types"
import styled from "styled-components"
import logo from "../images/logo.png"
import darkLogo from "../images/logo_dark.png"

export const Logo = styled.div`
  background: url(${p => (p.isDark ? darkLogo : logo)}) no-repeat;
  position: relative;
  background: transparent;
  width: 100%;
  min-height: 70px; 

  &::after {
    content: "";
    background: url(${p => (p.isDark ? darkLogo : logo)}) center no-repeat;
    background-size: 183px 69px;
    max-height: 70px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
  }

  @supports not (display: grid) {
    display: flex;
  }

  @supports (display: grid) {
    display: grid;
  }

  grid-area: logo;
  justify-content: center;
  align-items: center;
`

Logo.propTypes = {
  isDark: PropTypes.bool
}

Logo.defaultProps = {
  isDark: false
}
