import PropTypes from "prop-types"

/**
 * The themed color values
 * @typedef {Object<string, string>} ThemeColors
 * @property {string} textColor The main text color value
 * @property {string} backgroundColor The main background color value
 * @property {string} primary The primary color for the theme
 * @property {string} secondary The secondary color for the theme
 */

/**
 * The themed breaekpoint values
 * @typedef {Object<string, string>} ThemeBreakpoints
 * @property {string} phone The breaekpoint setting for a phone
 * @property {string} tablet The breaekpoint setting for a tablet
 * @property {string} tabletLandscape The breaekpoint setting for a table (in landscape mode)
 * @property {string} desktop The breaekpoint setting for a desktop/laptop computer
 * @property {string} largeDesktop The breaekpoint setting for a large screen desktop computer
 */

/**
 * The app's theme, provided for each component
 *
 * @typedef {Object<string, ThemeColors>} Theme
 * @property {ThemeColors} colors The set of themed color values for the app
 * @property {ThemeBreakpoints} breakpoints Responsive breakpoint values
 */

export const PropTypesTheme = PropTypes.shape({
  colors: PropTypes.shape({
    textColor: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    primary: PropTypes.string.isRequired,
    secondary: PropTypes.string.isRequired
  })
})

export default {
  colors: {
    textColor: "white",
    backgroundColor: "#282c34",
    primary: "#61dafb",
    secondary: "#61dafb"
  },
  breakpoints: {
    phone: "screen and (max-width: 599px)",
    tablet: "screen and (min-width: 600px)",
    tabletLandscape: "screen and (min-width: 900px)",
    desktop: "screen and (min-width: 1200px)",
    largeDesktop: "screen and (min-width: 1800px)"
  }
}
