import PropTypes from "prop-types"
import styled from "styled-components"

export const Main = styled.main`
  height: 100%;
  display: grid;
  grid-area: main;
  align-items: start;
`

export const Page = styled.div`
  height: 100%;

  @supports not (display: grid) {
    .header,
    .main {
      max-width: 50em;
      margin: 0 auto;
    }
  }

  @supports (display: grid) {
    @media ${p => p.theme.breakpoints.phone || "screen and (max-width: 599px)"} {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr;
      grid-template-areas: 'header' 'main';
    }

    @media ${p => p.theme.breakpoints.tablet || "screen and (min-width: 600px)"} {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 50px 1fr;
      grid-template-areas: 'header' 'main';
    }
  }
`

export const MessageWrapper = styled.div`
  grid-area: statusmessage;
  @media ${props => props.theme.breakpoints.phone || "screen and (max-width: 599px)"} {
    display: none;
  }
  @media ${props => props.theme.breakpoints.tablet || "screen and (min-width: 600px)"} {
    display: grid;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    overflow: hidden;
    color: mediumgray;
    font-size: 12px;
    transition: transform 0.4s ease;
    transform: translate(0, ${props => (props.hasMessage ? "0" : "-50px")});
  }
`

MessageWrapper.propTypes = {
  hasMessage: PropTypes.bool
}

export const Header = styled.header`
  margin: 0;
  padding: 0;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
  background: ${props => props.theme.colors.white || "white"};

  @supports (display: grid) {
    display: grid;
    grid-area: header;
    align-items: center;
    align-content: start;
    justify-items: center;
    grid-row-gap: 0;
    grid-template-rows: 48px 2px;
    @media ${props => props.theme.breakpoints.phone || "screen and (max-width: 599px)"} {
      grid-template-columns: 132px 1fr;
      grid-template-areas: ". statusmessage";
    }
    @media ${props => props.theme.breakpoints.tablet || "screen and (min-width: 600px)"} {
      grid-template-columns: 162px 1fr;
      grid-template-areas: ". statusmessage";
    }
  }
`
