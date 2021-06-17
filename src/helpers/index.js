import ms from "ms"
import jwt from "jsonwebtoken"
import format from "date-fns/format/index.js"
import zonedTimeToUtc from "date-fns-tz/zonedTimeToUtc/index.js"
import utcToZonedTime from "date-fns-tz/utcToZonedTime/index.js"
import Types from "../jsdoc.typedefs.js"

/**
 * HTTP response error codes
 * @name ErrorCodes
 * @type {Object<number, string>}
 * @constant
 * @default
 */
export const ErrorCodes = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  402: "PAYMENT_REQUIRED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  405: "METHOD_NOT_ALLOWED",
  406: "NOT_ACCEPTABLE",
  407: "PROXY_AUTHENTICATION_REQUIRED",
  408: "REQUEST_TIMEOUT",
  409: "CONFLICT",
  410: "GONE",
  411: "LENGTH_REQUIRED",
  412: "PRECONDITION_FAILED",
  413: "PAYLOAD_TOO_LARGE",
  414: "URI_TOO_LONG",
  415: "UNSUPPORTED_MEDIA_TYPE",
  416: "REQUESTED_RANGE_NOT_SATISFIABLE",
  417: "EXPECTATION_FAILED",
  418: "I'M_A_TEAPOT",
  421: "MISDIRECTED_REQUEST",
  422: "UNPROCESSABLE_ENTITY",
  423: "LOCKED",
  424: "FAILED_DEPENDENCY",
  425: "TOO_EARLY",
  426: "UPGRADE_REQUIRED",
  428: "PRECONDITION_REQUIRED",
  429: "TOO_MANY_REQUESTS",
  431: "REQUEST_HEADER_FIELDS_TOO_LARGE",
  451: "UNAVAILABLE_FOR_LEGAL_REASONS",
  500: "INTERNAL_SERVER_ERROR",
  501: "NOT_IMPLEMENTED",
  502: "BAD_GATEWAY",
  503: "SERVICE_UNAVAILABLE",
  504: "GATEWAY_TIMEOUT",
  505: "HTTP_VERSION_NOT_SUPPORTED",
  506: "VARIANT_ALSO_NEGOTIATES",
  507: "INSUFFICIENT_STORAGE",
  508: "LOOP_DETECTED",
  510: "NOT_EXTENDED",
  511: "NETWORK_AUTHENTICATION_REQUIRED"
}

/**
 * Checks if a given error code is a 400-level error
 *
 * @function
 * @name is400LevelError
 * @param {number|string} code The http status code or text to evaluate
 * @returns {boolean} Whether or not the error code is a 400-level error
 */
export function is400LevelError(code) {
  return typeof code === "number"
    ? code >= 400
    : Object.entries(ErrorCodes)
      .filter(([key]) => +key >= 400)
      .some(([_, statusText]) => statusText === code)
}

/**
 * Checks if a given error code is a 500-level error
 *
 * @function
 * @name is500LevelError
 * @param {number|string} code The http status code or text to evaluate
 * @returns {boolean} Whether or not the error code is a 500-level error
 */
export function is500LevelError(code) {
  return typeof code === "number"
    ? code >= 500
    : Object.entries(ErrorCodes)
      .filter(([key]) => +key >= 500)
      .some(([_, statusText]) => statusText === code)
}

/**
 * Creates a JWT
 *
 * @function
 * @name createJwt
 * @param {Object<string, any>} [claims] Custom claims to encode into the JWT
 * @param {string} [secret] An optional secret to sign the JWT with
 * @param {Object<string, any>} [options] JWT issuer and expiration options
 * @param {string} [options.expiresIn] A timespan for the JWT (ie '1hr', '10m' or a timespan in milliseconds)
 * @param {string} [options.issuer] The authority issuing the token
 * @param {string} [options.audience] The intended audience for the token
 * @param {string} [options.subject] The subject of the token
 * @returns {string} The encoded JWT value
 */
export function createJwt(claims, secret, options) {
  return jwt.sign(claims, secret, options)
}

/**
 * Decodes a given JWT string
 *
 * @function
 * @name decodeJwt
 * @param {string} val A JWT string to decode
 * @returns {Object<string, any>|undefined} The decoded JWT value
 */
export function decodeJwt(val) {
  try {
    return jwt.decode(val)
  } catch (err) {
    // not a valid jwt
    return undefined
  }
}

/**
 * Checks if a given JWT is valid
 *
 * @function
 * @name validateJwt
 * @param {string} val A JWT string to verify
 * @param {string} secret An optional secret to sign the JWT with
 * @returns {boolean} Whether or not the JWT valid
 */
export function validateJwt(val, secret) {
  try {
    return Boolean(jwt.verify(val, secret))
  } catch (err) {
    return false
  }
}

/**
 * Checks if a given JWT has expired
 *
 * @function
 * @name isJwtExpired
 * @param {string} val A JWT string to verify
 * @param {string} [secret] An optional secret to sign the JWT with
 * @returns {boolean} Whether or not the JWT has expired
 */
export function isJwtExpired(val, secret) {
  try {
    if (secret) {
      return !jwt.verify(val, secret)
    }
    const { exp } = decodeJwt(val) || {}
    return exp == null || (exp * 1000) < Date.now()
  } catch (err) {
    return err.name === "TokenExpiredError"
  }
}

/**
 * Checks if a given value passes a semantic version format check
 *
 * @function
 * @name isSemver
 * @param {string} val The value to be validated as a semver
 * @returns {boolean} Whether or not the value is a valid semantic version
 */
export function isSemver(val) {
  return /^([0-9]+)\.([0-9]+)\.([0-9]+)([+-][a-zA-Z0-9]+[a-zA-Z0-9_+.-]*)?$/.test(val)
}

/**
 * Checks if a given value passes a (fairly) simple email format check
 *
 * @function
 * @name isEmail
 * @param {string} val The value to be validated as an email
 * @returns {boolean} Whether or not the value is an email
 */
export function isEmail(val) {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val)
}

/**
 * Checks if a given value passes a password format check
 *
 * @function
 * @name isPassword
 * @param {string} val The value to be validated as a password
 * @returns {boolean} Whether or not the value is an acceptable password
 */
export function isPassword(val) {
  return /^(?!.*[\s])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,}$/.test(val)
}

/**
 * Parse a semantic version string into major/minor/parts (if needed)
 *
 * @function
 * @name splitVersionIntoParts
 * @param {Object<string, any>} val The objet containing the semantic version
 * @param {string} val.version The semantic version
 * @returns {Types.Version} The parsed major/minor/patch parts
 */
export function splitVersionIntoParts(val) {
  return (val.major == null || val.minor == null || val.patch == null) && typeof val.version === "string"
    ? {
      ...val,
      major: +val.version.split(".")[0],
      minor: +val.version.split(".")[1],
      patch: +val.version.split(".")[2]
    }
    : val
}

/**
 * Calculates an array sort value for a Device based on multiple flag values in the device
 *
 * @function
 * @name statusSortValue
 * @param {Types.Device} device A device object
 * @returns {number} A numeric sort value
 */
export function statusSortValue(device) {
  return device.isCurrent
    ? 1
    : device.inProgress
      ? 0
      : -1
}

/**
 * Attempts to convert a given value to a Date
 *
 * @function
 * @name toDate
 * @param {number|string|Date} dt A value which may be a Date or able to be converted to a date
 * @param {boolean} [convertToUTC] Whether or not to convert the date to UTC
 * @returns {Date|undefined} Either the successfully converted date or undefined
 */
export function toDate(dt, convertToUTC = true) {
  const d = dt instanceof Date
    ? dt
    : typeof dt === "number" && `${dt}`.length === `${Date.now()}`.length
      ? new Date(dt)
      : typeof dt === "number" && `${dt * 1000}`.length === `${Date.now()}`.length
        ? new Date(dt * 1000)
        : typeof dt === "string" && !Number.isNaN((new Date(dt)).valueOf())
          ? new Date(dt)
          : undefined

  if (d && convertToUTC) {
    const localOffset = (new Date().getTimezoneOffset() * ms("1m")) / ms("1h")
    const timezoneOffset = `${localOffset < 0 ? "+" : "-"}${localOffset < 10 ? "0" : ""}${localOffset}`
    return zonedTimeToUtc(d, timezoneOffset)
  }

  return d
}

/**
 * Gets the current datetime
 *
 * @function
 * @name getCurrentZonedDate
 * @returns {Date} The current datetime
 */
export function getCurrentZonedDate() {
  return utcToZonedTime(new Date())
}

/**
 * Gets the current UTC datetime, accounting for the local offset
 *
 * @function
 * @name getCurrentUTC
 * @returns {Date} The current UTC datetime
 */
export function getCurrentUTC() {
  const localOffset = (new Date().getTimezoneOffset() * ms("1m")) / ms("1h")
  const timezoneOffset = `${localOffset < 0 ? "+" : "-"}${localOffset < 10 ? "0" : ""}${localOffset}`
  return zonedTimeToUtc(new Date(), timezoneOffset)
}

/**
 * Parses a given date and formats it in YYYY/mm/DD format, unless it was within the past day, it will then list the hours, minutes or seconds since now
 *
 * @function
 * @name toRecentTimespanOrYearMonthDay
 * @param {number|string|Date} dt A date value to parse
 * @param {boolean} [convertToUTC] Whether or not to convert the date to UTC
 * @returns {string|undefined} A string value displaying either the recent timespan or the formatted date (in YYYY/mm/DD format)
 */
export function toRecentTimespanOrYearMonthDay(dt, convertToUTC) {
  const d = toDate(dt, convertToUTC)

  if (d) {
    const utc = getCurrentUTC()

    if (ms("1d") > utc.valueOf() - d.valueOf()) {
      return `${ms(utc.valueOf() - d.valueOf(), { long: true })} ago`
    }

    return format(d, "yyyy/MM/dd")
  }

  return undefined
}

/**
 * Sorts a list of major/minor/patch parts in order from latest to earliest versions
 *
 * @function
 * @name sortVersions
 * @param {Array<Types.Version>} versions A list of semantic version parts
 * @param {boolean} [latestFirst] Whether or not to sort so that the newer versions are first in the list
 * @returns {Array<Types.Version>} The sorted list of semantic versions
 */
export function sortVersions(versions, latestFirst = true) {
  return versions.map(splitVersionIntoParts).sort((v1, v2) => (
    (
      v2.major > v1.major
      || (v2.major === v1.major && v2.minor > v1.minor)
      || (v2.major === v1.major && v2.minor === v1.minor && v2.patch > v1.patch)
    )
      ? (latestFirst ? 1 : -1)
      : (latestFirst ? -1 : 1)
  ))
}
