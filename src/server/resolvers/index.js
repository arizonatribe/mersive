import { ApolloError } from "apollo-server-express"

export default {
  User: {
    canPerformUpdates(user) {
      return Boolean(
        (user && user.isAdmin)
        || (user.permissions || []).includes("update")
      )
    }
  },
  Query: {
    async getLatestFirmwareVersion(_, _args, { dbClient }) {
      return dbClient.findLatestVersion()
    },
    async getDevicesByEmail(_, { email }, { dbClient }) {
      return dbClient.findDevicesByEmail(email)
    },

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

    async devices(_, _args, { dbClient }) {
      return dbClient.findDevices()
    }
  }
}
