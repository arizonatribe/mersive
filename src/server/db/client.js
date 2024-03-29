/* eslint-disable consistent-return */
import knex from "knex"
import { ApolloError, UserInputError } from "apollo-server-express"
import {
  validateJwt,
  isJwtExpired,
  decodeJwt,
  isEmail,
  isPassword,
  createJwt,
  sortVersions
} from "../../helpers/index.js"
import Types from "../../jsdoc.typedefs.js"

/**
 * Creates a database connection and provides basic ORM methods.
 *
 * @function
 * @name createDbClient
 * @param {Object<string, any>} config The db configuration details
 * @param {Types.DbConnection} config.connection The database connection details
 * @param {string} config.clientName The db client name
 * @param {Object<string, function>} logger A threshold based logger
 * @returns {DbClient} An instance of the ORM
 */
export default function createDbClient(config, logger) {
  const { connection, clientName } = config || {}
  logger.debug({ config })

  if (!clientName) {
    throw new UserInputError("Missing DB client name (ie, 'pg', 'sqlite3', etc.)")
  }
  if (!connection || (!connection.filename && !connection.user && !connection.password)) {
    throw new UserInputError("Invalid DB connection configuration details")
  }

  const sql = knex({
    multipleStatements: true,
    useNullAsDefault: true,
    client: clientName,
    connection
  })

  /**
   * A database query client whose async methods execute database queries to normalized DB tables and re-shape the data into the models advertised by the REST/GraphQL API
   *
   * @name DbClient
   * @class
   */
  const dbClient = {
    /**
     * Fetches the current list of all devices
     *
     * @function
     * @name DbClient#findAllDevices
     * @returns {Promise<Array<Types.Device>>} A promise which resolves with a list of Devices
     */
    async findAllDevices() {
      try {
        const devicesWithFirmware = await sql.raw(`
          SELECT
            devices.id as id,
            devices.name as name,
            devices.user_email as email,
            firmware.major as major,
            firmware.minor as minor,
            firmware.patch as patch,
            strftime('%s', updates.finished) as finished
          FROM
            devices
          LEFT JOIN firmware_versions as firmware ON devices.firmware_version_id = firmware.id
          LEFT JOIN updates ON devices.id = updates.device_id
        `)

        logger.debug({ devicesWithFirmware })

        const devices = {}
        const currentVersion = await dbClient.findLatestVersion()

        devicesWithFirmware.forEach(device => {
          const deviceUpdates = devicesWithFirmware.filter(d => d.id === device.id)
          const [{ finished: lastUpdatedAt }] = deviceUpdates.sort((a, b) => (b.finished - a.finished))
          const [{ major, minor, patch }] = sortVersions(deviceUpdates)
          const version = `${major}.${minor}.${patch}`

          devices[device.id] = {
            id: device.id,
            version,
            email: device.email,
            lastUpdatedAt,
            name: device.name,
            inProgress: device.finished != null,
            isCurrent: version === currentVersion
          }
        })

        logger.debug({ devices })

        return Object.values(devices)
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Fetches the current list of all devices for a given user
     *
     * @function
     * @throws {UserInputError} When the email is missing or in an invalid format
     * @name DbClient#findDevicesByEmail
     * @param {string} email The user email by which to look up devices
     * @returns {Promise<Array<Types.Device>>} A promise which resolves with a list of Devices for the User
     */
    async findDevicesByEmail(email) {
      logger.debug({ email })

      if (email == null) {
        throw new UserInputError("Missing the email address")
      }
      if (!isEmail(email)) {
        throw new UserInputError(`Not a valid email address: ${email}`, { email })
      }

      try {
        const devicesByEmail = await sql.raw(`
          SELECT
            devices.id as id,
            devices.name as name,
            devices.user_email as email,
            firmware.major as major,
            firmware.minor as minor,
            firmware.patch as patch,
            strftime('%s', updates.finished) as finished
          FROM
            devices
          LEFT JOIN firmware_versions as firmware ON devices.firmware_version_id = firmware.id
          LEFT JOIN updates ON devices.id = updates.device_id
          WHERE
            devices.user_email = '${email}'
        `)

        logger.debug({ devicesByEmail })

        const devices = {}
        const currentVersion = await dbClient.findLatestVersion()

        devicesByEmail.forEach(device => {
          const deviceUpdates = devicesByEmail.filter(d => d.id === device.id)
          const [{ finished: lastUpdatedAt }] = deviceUpdates.sort((a, b) => (b.finished - a.finished))
          const [{ major, minor, patch }] = sortVersions(deviceUpdates)
          const version = `${major}.${minor}.${patch}`

          devices[device.id] = {
            id: device.id,
            version,
            email,
            lastUpdatedAt,
            name: device.name,
            inProgress: device.finished != null,
            isCurrent: version === currentVersion
          }
        })

        logger.debug({ devices })

        return Object.values(devices)
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Fetches the latest firmware version
     *
     * @function
     * @name DbClient#findLatestVersion
     * @returns {Promise<string>} A promise which resolves with the latest firmware version number
     */
    async findLatestVersion() {
      try {
        const firmwareVersions = await sql.raw(`
          SELECT
            major,
            minor,
            patch
          FROM
            firmware_versions
        `)

        logger.debug({ firmwareVersions })

        const [{ major, minor, patch }] = sortVersions(firmwareVersions)

        logger.debug({ major, minor, patch })

        return `${major}.${minor}.${patch}`
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Fetches a device by its unique ID
     *
     * @function
     * @throws {UserInputError} When the device ID is missing or is not a valid number
     * @name DbClient#findDeviceById
     * @param {number} id The device's unique ID
     * @returns {Promise<Types.Device>} A promise which resolves with Device matching the ID
     */
    async findDeviceById(id) {
      logger.debug({ id })

      if (id == null) {
        throw new UserInputError("Missing the device ID")
      }
      if (typeof id !== "number" || id <= 0) {
        throw new UserInputError(
          `A device ID must be a positive integer value, but instead received: ${id}`,
          { id }
        )
      }

      try {
        const deviceWithUpdates = await sql.raw(`
          SELECT
            devices.id as id,
            devices.name as name,
            devices.user_email as email,
            firmware.major as major
            firmware.minor as minor,
            firmware.patch as patch,
            strftime('%s', updates.finished) as finished
          FROM
            devices
          LEFT JOIN firmware_versions as firmware ON devices.firmware_version_id = firmware.id
          LEFT JOIN updates ON devices.id = updates.device_id
          WHERE
            devices.id = ${id}
        `)

        logger.debug({ deviceWithUpdates })

        if (!deviceWithUpdates || !deviceWithUpdates.length) {
          return null
        }

        const [{ major, minor, patch }] = sortVersions(deviceWithUpdates)
        const version = `${major}.${minor}.${patch}`
        const currentVersion = await dbClient.findLatestVersion()
        const [{ finished: lastUpdatedAt }] = deviceWithUpdates.sort((a, b) => (b.finished - a.finished))

        const device = {
          id,
          version,
          lastUpdatedAt,
          name: deviceWithUpdates[0].name,
          email: deviceWithUpdates[0].email,
          inProgress: deviceWithUpdates.some(d => d.finished != null),
          isCurrent: version === currentVersion
        }

        logger.debug({ device })

        return device
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Fetches a user by their unique email
     *
     * @function
     * @throws {UserInputError} When the email is missing or in an invalid format
     * @name DbClient#findUserByEmail
     * @param {string} email The user's email address
     * @param {boolean} [includeDevices=true] Whether to include the user's devices
     * @returns {Promise<Types.User>} A promise which resolves with the User matching the email address
     */
    async findUserByEmail(email, includeDevices = true) {
      logger.debug({ email, includeDevices })

      if (email == null) {
        throw new UserInputError("Missing the email address")
      }
      if (!isEmail(email)) {
        throw new UserInputError(`Not a valid email address: ${email}`, { email })
      }

      try {
        const usersWithPermissions = await sql.raw(`
          SELECT
            users.email as email,
            users.admin as isAdmin,
            permissions.permission as permission,
            (users.subscription_ends < CURRENT_TIMESTAMP) as isSubscriptionExpired
          FROM
            users
          LEFT JOIN user_permissions as permissions ON users.email = permissions.user_email
          WHERE
            users.email = '${email}'
        `)

        logger.debug({ usersWithPermissions })

        if (!usersWithPermissions || !usersWithPermissions.length) {
          return null
        }

        let devices
        if (includeDevices) {
          devices = await dbClient.findDevicesByEmail(email)
          logger.debug({ devices })
        }

        const user = {
          email,
          devices,
          isAdmin: !!usersWithPermissions[0].isAdmin,
          isSubscriptionExpired: usersWithPermissions[0].isSubscriptionExpired,
          permissions: Array.from(
            new Set(usersWithPermissions.map(u => u.permission))
          )
        }

        logger.debug({ user })

        return user
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Fetches the current list of all users whose subscription has ended
     *
     * @function
     * @name DbClient#findExpiredUsers
     * @returns {Promise<Array<Types.User>>} A promise which resolves with a list of Users with expired subscriptions
     */
    async findExpiredUsers() {
      try {
        const usersWithPermissions = await sql.raw(`
          SELECT
            users.email as email,
            users.admin as isAdmin,
            permissions.permission as permission
          FROM
            users
          LEFT JOIN user_permissions as permissions ON users.email = permissions.user_email
          WHERE users.subscription_ends < CURRENT_TIMESTAMP
          ORDER BY users.email
        `)

        logger.debug({ usersWithPermissions })

        const users = {}

        for (const user of usersWithPermissions) {
          const devices = users[user.email]
            ? users[user.email].devices
            : await dbClient.findDevicesByEmail(user.email)

          users[user.email] = {
            devices,
            email: user.email,
            isAdmin: !!user.isAdmin,
            isSubscriptionExpired: true,
            permissions: Array.from(
              new Set([
                ...(users[user.email]?.permissions || []),
                user.permission
              ].filter(Boolean))
            )
          }
        }

        logger.debug({ users })

        return Object.values(users)
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Fetches the current list of all users
     *
     * @function
     * @name DbClient#findAllUsers
     * @returns {Promise<Array<Types.User>>} A promise which resolves with a list of Users
     */
    async findAllUsers() {
      try {
        const usersWithPermissions = await sql.raw(`
          SELECT
            users.email as email,
            users.admin as isAdmin,
            permissions.permission as permission,
            (users.subscription_ends < CURRENT_TIMESTAMP) as isSubscriptionExpired
          FROM
            users
          LEFT JOIN user_permissions as permissions ON users.email = permissions.user_email
          ORDER BY users.email
        `)

        logger.debug({ usersWithPermissions })

        const users = {}

        for (const user of usersWithPermissions) {
          const devices = users[user.email]
            ? users[user.email].devices
            : await dbClient.findDevicesByEmail(user.email)

          users[user.email] = {
            devices,
            email: user.email,
            isAdmin: !!user.isAdmin,
            isSubscriptionExpired: !!user.isSubscriptionExpired,
            permissions: Array.from(
              new Set([
                ...(users[user.email]?.permissions || []),
                user.permission
              ].filter(Boolean))
            )
          }
        }

        logger.debug({ users })

        return Object.values(users)
      } catch (err) {
        logger.error(err)
      }
    },

    /**
     * Authenticates a user by their credentials
     *
     * @function
     * @throws {UserInputError} When the email is missing or in an invalid format
     * @throws {UserInputError} When the password is missing or in an invalid format
     * @throws {ApolloError} (401) When the credentials are invalid (or the user doesn't exist)
     * @name DbClient#authenticateUser
     * @param {string} email The user's email address
     * @param {string} password The user's password
     * @returns {Promise<string>} A promise which resolves with a valid access token
     */
    async authenticateUser(email, password) {
      logger.debug({ email, password: password != null ? "[REDACTED]" : password })

      if (password == null) {
        throw new UserInputError("Missing the password")
      }
      if (!isPassword(password)) {
        throw new UserInputError([
          "Password is not in a valid format",
          "Should be a mix of alpha-numeric (mixed case) and at least one symbol",
          "Should be at least 8 characters total as well"
        ].join(". "))
      }

      const user = await dbClient.findUserByEmail(email, false)

      // TODO: For the sake of this coding exercise, password salting & hashing is ignored (would require database schema changes)
      if (!user) {
        throw new ApolloError("Invalid login credentials", 401, { email })
      }

      return createJwt({
        scope: `can_view_own_devices${
          user.isAdmin || (user.permissions || []).includes("update")
            ? " can_perform_updates"
            : ""
        }`
      }, config.secret, {
        issuer: config.name,
        subject: email,
        expiresIn: "1h",
        audience: [config.host, config.port].join(":")
      })
    },

    /**
     * Validates a given access token
     *
     * @function
     * @name DbClient#verifyToken
     * @throws {UserInputError} When the acces token is invalid, missing, or wasn't issued by this server
     * @param {string} token The access token
     * @returns {Promise<Types.DecodedJwt|undefined>} A decoded, validated token
     */
    async verifyToken(token) {
      if (token == null) {
        throw new UserInputError("Token is missing")
      }
      if (isJwtExpired(token, config.secret)) {
        throw new ApolloError("Token has expired", 401)
      }
      if (!validateJwt(token, config.secret)) {
        throw new ApolloError("Invalid access token", 401)
      }

      const decoded = decodeJwt(token)
      logger.debug({ decoded })
      return decoded
    }
  }

  return dbClient
}
