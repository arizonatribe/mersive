/* eslint-disable no-console */

/**
 * A single device object
 *
 * @typedef {Object<string, string>} Device
 * @property {string} id The unique identifier for the device
 * @property {string} name The name of the device
 * @property {Array<string>} [versions] The semantic releases for the device
 */

/**
 * An async function which retrieves a list of devices
 *
 * @function
 * @name fetchDevices
 * @returns {Promise<Array<Device>>} A promise which resolves with the requested device data
 */
export async function fetchDevices() {
  try {
    const response = await fetch("http://localhost:4000/graphql", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application.json"
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
