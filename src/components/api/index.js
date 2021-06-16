/* eslint-disable no-console */
const port = process.env.PORT || 4000
const host = process.env.HOST || "localhost"
const url = `http://${host}:${port}/graphql`

/**
 * Whether or not an API result has GraphQL errors
 *
 * @function
 * @name hasGraphqlError
 * @param {Object<string, any>} result The API result
 * @returns {boolean} Whether or not there are GQL errors
 */
function hasGraphqlError(result) {
  return (result?.errors || []).some(e => e.extensions?.code >= 400)
}

/**
 * A single device object
 *
 * @typedef {Object<string, string>} Device
 * @property {string} id The unique identifier for the device
 * @property {string} name The name of the device
 * @property {Array<string>} [versions] The semantic releases for the device
 */

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
      Accept: "application.json"
    },
    body: JSON.stringify({
      query: `mutation {
        login(email: "${email || ""}", password: "${password || ""}")
      }`
    })
  })

  const result = await response.json()
  if (response.status >= 400 || hasGraphqlError(result)) {
    throw new Error(result.errors.map(e => e.message).join(". ") || response.statusText)
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
      Accept: "application.json"
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
  if (response.status >= 400 || hasGraphqlError(result)) {
    throw new Error(result.errors.map(e => e.message).join(". ") || response.statusText)
  }

  return result?.data?.verifyToken?.sub
}

/**
 * An async function which retrieves a list of devices
 *
 * @function
 * @name fetchDevices
 * @param {string} [token] The bearer token to use in the request
 * @returns {Promise<Array<Device>>} A promise which resolves with the requested device data
 */
export async function fetchDevices(token) {
  try {
    const response = await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application.json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({
        query: `{
          devices {
            id
            name
            versions
          }
        }`
      })
    })

    console.debug({
      status: response.status,
      statusText: response.statusText
    })

    const result = await response.json()
    console.debug({ result })

    return result
  } catch (err) {
    console.warn("Failed to fetch data")
    console.error(err)

    /* Treating this more of like a "search" query, so an empty list and a  204 (rather than a 404) is most appropiate */
    return []
  }
}
