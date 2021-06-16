import jwt from "jsonwebtoken"
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
 * Sorts a list of major/minor/patch parts in order from latest to earliest versions
 *
 * @function
 * @name sortVersions
 * @param {Array<Types.Version>} versions A list of semantic version parts
 * @returns {Array<Types.Version>} The sorted list of semantic versions
 */
export function sortVersions(versions) {
  return versions.sort((v1, v2) => (
    (
      v2.major > v1.major
      || (v2.major === v1.major && v2.minor > v1.minor)
      || (v2.major === v1.major && v2.minor === v1.minor && v2.patch > v1.patch)
    )
      ? 1
      : -1
  ))
}
