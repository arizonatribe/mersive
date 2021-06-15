/* eslint-disable class-methods-use-this */
import { ApolloError, UserInputError, ForbiddenError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { SchemaDirectiveVisitor } from "graphql-tools"

/**
 * A directive which ensures the calling user is the user associated with the device (or is an admin)
 *
 * @class
 * @name isDeviceUser
 */
export class isDeviceUser extends SchemaDirectiveVisitor {
  /**
   * Apollo's pattern for defining directives is to create methods which correspond to the QUERY | FIELD | FIELD_DEFINITION (or other entities you can decorate a directive with).
   * You can then make a resolver be called conditionally based on some custom criteria.
   *
   * @function
   * @name isDeviceUser#visitFieldDefinition
   * @param {Object<string, string|Object<string, any>>} field The defined field
   * @param {string} field.resolve The resolver around which the directive is decorated
   */
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    /**
     * A GraphQL directive which verifies the user making the call is associated with the device (or is an admin) prior to running the query itself
     *
     * @function
     * @name isDeviceUser#enhancedResolve
     * @param {Object<string, any>} source The parent source object (not used for root level Queries/Mutations)
     * @param {Object<string, any>} args GraphQL args provided to the query
     * @param {Object<string, any>} context Common dependencies used across all GraphQL resovlers/directives
     * @param {Object<string, function>} context.dbClient The database client itself
     * @param {Object<string, function>} context.dbClient.findDeviceById A method which retrieves a device by its ID
     * @param {Object<string, any>} info GraphQL query AST
     * @returns {*} The result of calling the underlying resolver itself
     */
    async function enhancedResolve(source, args, context, info) {
      const { user, dbClient } = context
      const { id, deviceId } = args

      if (!id && !deviceId) {
        throw new UserInputError(
          "Missing the device ID, so cannot verify this user can run this query against devices"
        )
      }

      if (!user) {
        throw new ApolloError(
          "Only authenticated users are allowed to perform this query",
          401
        )
      }

      const device = await dbClient.findDeviceById(deviceId || id)
      if (!device) {
        throw new ApolloError(
          `No device found matching id: '${deviceId || id}'`,
          404,
          { deviceId: deviceId || id }
        )
      }

      if (user.isAdmin || device.email === user.email) {
        return resolve.call(this, source, args, context, info)
      }

      return Promise.reject(new ForbiddenError(`User ${user.email} is not associated with device '${deviceId || id}'`))
    }

    field.resolve = enhancedResolve
  }
}
