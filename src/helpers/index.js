import ms from "ms"
import jwt from "jsonwebtoken"
import format from "date-fns/format/index.js"
import zonedTimeToUtc from "date-fns-tz/zonedTimeToUtc/index.js"
import utcToZonedTime from "date-fns-tz/utcToZonedTime/index.js"
import Types from "../jsdoc.typedefs.js"

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
  return device.inProgress
    ? 1
    : device.isCurrent
      ? 0
      : -1
}

/**
 * Attempts to convert a given value to a Date
 *
 * @function
 * @name toDate
 * @param {number|string|Date} dt A value which may be a Date or able to be converted to a date
 * @returns {Date|undefined} Either the successfully converted date or undefined
 */
export function toDate(dt) {
  const d = dt instanceof Date
    ? dt
    : typeof dt === "number" && `${dt}`.length === `${Date.now()}`.length
      ? new Date(dt)
      : typeof dt === "number" && `${dt * 1000}`.length === `${Date.now()}`.length
        ? new Date(dt * 1000)
        : typeof dt === "string" && !Number.isNaN((new Date(dt)).valueOf())
          ? new Date(dt)
          : undefined

  if (d) {
    const localOffset = (new Date().getTimezoneOffset() * ms("1m")) / ms("1h")
    const timezoneOffset = `${localOffset < 0 ? "+" : "-"}${localOffset < 10 ? "0" : ""}${localOffset}`
    return zonedTimeToUtc(d, timezoneOffset)
  }

  return undefined
}

/**
 * Gets the current datetime, accounting for the local offset
 *
 * @function
 * @name getCurrentZonedDate
 * @returns {Date} The current datetime
 */
export function getCurrentZonedDate() {
  return utcToZonedTime(new Date())
}

/**
 * Parses a given date and formats it in YYYY/mm/DD format, unless it was within the past day, it will then list the hours, minutes or seconds since now
 *
 * @function
 * @name toRecentTimespanOrYearMonthDay
 * @param {number|string|Date} dt A date value to parse
 * @returns {string|undefined} A string value displaying either the recent timespan or the formatted date (in YYYY/mm/DD format)
 */
export function toRecentTimespanOrYearMonthDay(dt) {
  const d = toDate(dt)

  if (d) {
    const currentDate = getCurrentZonedDate()

    if (ms("1d") > currentDate.valueOf() - d.valueOf()) {
      return `${ms(currentDate.valueOf() - d.valueOf(), { long: true })} ago`
    }

    return format(d, "yyyy/mm/dd")
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
