/* eslint-disable no-console */
import Types from "../../jsdoc.typedefs.js"

const port = process.env.PORT || 4000
const host = process.env.HOST || "localhost"
const url = `http://${host}:${port}/graphql`

/**
 * Whether or not an API result has GraphQL errors
 *
 * @function
 * @name hasGraphqlError
 * @param {Object<string, any>} result The API result
 * @param {Array<Types.GraphQLError>} [result.errors] The location for GraphQL errors (according to the GQL spec) where errors and warnings are stored (either in successful or unsuccessful responses)
 * @returns {boolean} Whether or not there are GQL errors
 */
function hasGraphqlError(result) {
  return (result?.errors || []).some(e => e.extensions?.code >= 400)
}

/**
 * Parses a list (potentially) multiple GraphQL errors into a single error message
 *
 * @function
 * @name parseErrors
 * @param {Object<string, any>} result The API result
 * @param {Array<Types.GraphQLError>} [result.errors] The location for GraphQL errors (according to the GQL spec) where errors and warnings are stored (either in successful or unsuccessful responses)
 * @param {Object<string, any>} [response] The fetch API response
 * @param {number} [response.status] The HTTP response code (checked as a fallback when no GQL errors, to see if >= 400)
 * @param {string} [response.statusText] The HTTP response status text (fallback in case there are no errors but the error status is still >= 400)
 * @returns {Error|undefined} A single error message (from the list of multiple GraphQL errors) which can then be thrown
 */
function parseError(result, response) {
  return hasGraphqlError(result)
    ? new Error(result.errors.map(e => e.message).join(". "))
    : response?.status >= 400
      ? new Error(response.statusText)
      : undefined
}

/**
 * Signs in a user by their credentials
 * @function
 * @name loginUser
 * @throws {Error} When the login fails
 * @param {string} email The user's email address
 * @param {string} password The user's password
 * @returns {Promise<string|undefined>} The access token received upon successful sign-in
 */
export async function loginUser(email, password) {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: `mutation {
        login(email: "${email || ""}", password: "${password || ""}")
      }`
    })
  })

  const result = await response.json()

  const err = parseError(result, response)
  if (err) {
    throw err
  }

  return result?.data?.login || result
}

/**
 * Validates an existing token
 * @function
 * @name verifyToken
 * @throws {Error} When the token validation fails
 * @param {string} token The token to validate
 * @returns {Promise<string|undefined>} The email associated with the validated token
 */
export async function verifyToken(token) {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: `{
        verifyToken(token: "${token || ""}") {
          sub
        }
      }`
    })
  })

  const result = await response.json()

  const err = parseError(result, response)
  if (err) {
    throw err
  }

  return result?.data?.verifyToken?.sub
}

/**
 * An async function which retrieves a list of devices
 *
 * @function
 * @name fetchDevices
 * @param {string} [token] The bearer token to use in the request
 * @returns {Promise<Array<Types.Device>>} A promise which resolves with the requested device data
 */
export async function fetchDevices(token) {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: JSON.stringify({
      query: `{
        devices {
          id
          name
          version
          isCurrent
          inProgress
          lastUpdatedAt
          user {
            email
            canPerformUpdates
            isSubscriptionExpired
          }
        }
      }`
    })
  })

  const result = await response.json()

  const err = parseError(result, response)
  if (err) {
    throw err
  }

  return result?.data?.devices || []
}

/**
 * An async function which retrieves the latest firmware version
 *
 * @function
 * @name fetchLatestFirmwareVersion
 * @returns {Promise<string>} A promise which resolves with the semantic version representing the latest firmware
 */
export async function fetchLatestFirmwareVersion() {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query: `{
        getLatestFirmwareVersion
      }`
    })
  })

  const result = await response.json()

  const err = parseError(result, response)
  if (err) {
    throw err
  }

  return result?.data?.getLatestFirmwareVersion
}
