import Types from "../jsdoc.typedefs"

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
