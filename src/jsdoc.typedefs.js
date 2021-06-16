/**
 * A single device object
 *
 * @typedef {Object<string, string>} Device
 * @property {number} id The unique identifier for the device
 * @property {string} name The name of the device
 * @property {string} version The firmware version for the device
 * @property {boolean} isCurrent Whether the device is on the most current version of the firmware
 * @property {boolean} inProgress Whether the device is currently being updated
 * @property {number} lastUpdatedAt The timestamp when the device was last updated
 */

/**
 * A User object
 *
 * @typedef {Object<string, string>} User
 * @property {string} email The unique identifier for the user
 * @property {boolean} isAdmin Whether or not the user is an admin
 * @property {boolean} isSubscriptionExpired Whether the user's device subscription has ended
 * @property {boolean} canPerformUpdates Whether the user is allowed to perform their own updates
 * @property {Array<string>} permissions The kinds of actions the user is allowed to take in this system
 */

/**
 * The database connection configuration
 *
 * @typedef {Object<string, string>} DbConnection
 * @property {string} [user] The database username
 * @property {string} [password] The database password
 * @property {string} [host] The database host/hostname
 * @property {string} [filename] When user/password authentication is not being used (ie, with sqlite3)
 */

/**
 * A semantic version
 *
 * @typedef {Object<string, number>} Version
 * @property {number} major The major version
 * @property {number} minor The minor version
 * @property {number} patch The patch version
 */

/**
 * A decoded JWT
 *
 * @typedef {Object<string, string|number>} DecodedJwt
 * @property {string} iss The issuer of the token
 * @property {string} aud The intended audience of the token
 * @property {string} sub The subject of the token
 * @property {number} exp The expiration for the token
 * @property {number} iat The time the token was issued
 */

/**
 * @typedef {Object<string, any>} GraphQLErrorExtensions
 * @property {number} [code] The true HTTP response code (regardless if someone chickened out and sent back a 200)
 */

/**
 * The shape of a standard GraphQL error in an HTTP response
 * @typedef {Object<string, string|GraphQLErrorExtensions>} GraphQLError
 * @property {string} message The error or warning message itself
 * @property {GraphQLErrorExtensions} [extensions] Additional error details
 */

export default {}
