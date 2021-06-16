import { ApolloError } from "apollo-server-express"
import Types from "../../jsdoc.typedefs.js"

export const Query = {
  /**
   * Performs a look-up of the latest operating system firmware published to-date
   *
   * @function
   * @name getLatestFirmwareVersion
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} _args GraphQL args provided to the query (not used for this query)
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findLatestVersion An async method which retrieves the latest semantic release
   * @returns {Promise<string>} The latest firmware (semantic) version
   */
  async getLatestFirmwareVersion(_, _args, { dbClient }) {
    return dbClient.findLatestVersion()
  },

  /**
   * Performs a look-up of all devices associated with a given user
   *
   * @function
   * @name getDevicesByEmail
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} args GraphQL args provided to the query
   * @param {string} args.email The email address for an existing user
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findDevicesByEmail An async method which retrieves all devices associated with a user (by their email)
   * @returns {Promise<Array<Types.Device>>} A list of devices associated with the user
   */
  async getDevicesByEmail(_, { email }, { dbClient }) {
    return dbClient.findDevicesByEmail(email)
  },

  /**
   * Performs a look-up of a single device by its unique identifier
   *
   * @function
   * @name getDeviceById
   * @throws {ApolloError} (404) If there is not a device matching the provided ID
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} args GraphQL args provided to the query
   * @param {number} args.id A unique idetnifier for a device
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findDeviceById An async method which retrieves a device by its ID
   * @returns {Promise<Types.Device>} A device matching the provided ID
   */
  async getDeviceById(_, { id }, { dbClient }) {
    const device = await dbClient.findDeviceById(id)

    if (!device) {
      throw new ApolloError(
        `No device record found matching id: ${id}`,
        404,
        { id }
      )
    }

    return device
  },

  /**
   * Performs a look-up of a user by their email (which is their unique identifier)
   *
   * @function
   * @name getUserByEmail
   * @throws {ApolloError} (404) If there is no user matching the provided email
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} args GraphQL args provided to the query
   * @param {string} args.email The email address for an existing user
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findUserByEmail An async method which retrieves a user by their email
   * @returns {Promise<Types.User>} A user matching the provided email
   */
  async getUserByEmail(_, { email }, { dbClient }) {
    const user = await dbClient.findUserByEmail(email)

    if (!user) {
      throw new ApolloError(
        `No user record found matching email: ${email}`,
        404,
        { email }
      )
    }

    return user
  },

  /**
   * Checks that an access token is valid and hasn't expired
   *
   * @function
   * @name login
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} args GraphQL args provided to the query
   * @param {string} args.token An access token issued by this provider
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.verifyToken An async method which validates a token
   * @returns {Promise<Types.DecodedJwt>} The decoded token
   */
  async verifyToken(_, { token }, { dbClient }) {
    try {
      const decoded = await dbClient.verifyToken(token)
      return decoded
    } catch (err) {
      const status = /(missing|invalid)/i.test(err.message)
        ? 400
        : /expired/i.test(err.message)
          ? 401
          : 403

      throw new ApolloError(err.message, status)
    }
  },

  /**
   * Retrieves the list of all users whose subscription has ended
   *
   * @function
   * @name getExpiredUsers
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} _args GraphQL args provided to the query (not used for this query)
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findExpiredUsers An async method which retrieves all users whose subscription has ended
   * @returns {Promise<Array<Types.User>>} A list of all users whose subscription has ended
   */
  async getExpiredUsers(_, _args, { dbClient }) {
    return dbClient.findExpiredUsers()
  },

  /**
   * Retrieves the list of all devices
   *
   * @function
   * @name devices
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} _args GraphQL args provided to the query (not used for this query)
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findAllDevices An async method which retrieves all devices
   * @returns {Promise<Array<Types.Device>>} A list of all devices
   */
  async devices(_, _args, { dbClient }) {
    return dbClient.findAllDevices()
  },

  /**
   * Retrieves the list of all users
   *
   * @function
   * @name users
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} _args GraphQL args provided to the query (not used for this query)
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.findAllUsers An async method which retrieves all users
   * @returns {Promise<Array<Types.User>>} A list of all users
   */
  async users(_, _args, { dbClient }) {
    return dbClient.findAllUsers()
  }
}
