/* eslint-disable class-methods-use-this */
import { ApolloError, ForbiddenError } from "apollo-server-express"
import { defaultFieldResolver } from "graphql"
import { SchemaDirectiveVisitor } from "graphql-tools"

/**
 * A directive which ensures the calling user is an admin
 *
 * @class
 * @name isAdmin
 */
export default class isAdmin extends SchemaDirectiveVisitor {
  /**
   * Apollo's pattern for defining directives is to create methods which correspond to the QUERY | FIELD | FIELD_DEFINITION (or other entities you can decorate a directive with).
   * You can then make a resolver be called conditionally based on some custom criteria.
   *
   * @function
   * @name isAdmin#visitFieldDefinition
   * @param {Object<string, string|Object<string, any>>} field The defined field
   * @param {string} field.resolve The resolver around which the directive is decorated
   */
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field

    /**
     * A GraphQL directive which verifies the user making the call is an admin prior to running the query itself
     *
     * @function
     * @name isAdmin#enhancedResolve
     * @param {Object<string, any>} source The parent source object (not used for root level Queries/Mutations)
     * @param {Object<string, any>} args GraphQL args provided to the query
     * @param {Object<string, any>} context Common dependencies used across all GraphQL resovlers/directives
     * @param {Object<string, any>} info GraphQL query AST
     * @returns {*} The result of calling the underlying resolver itself
     */
    async function enhancedResolve(source, args, context, info) {
      const { user } = context

      if (!user) {
        throw new ApolloError(
          "Only authenticated users are allowed to perform this query",
          401
        )
      }

      if (user.isAdmin) {
        return resolve.call(this, source, args, context, info)
      }

      return Promise.reject(new ForbiddenError("Only administrators can perform this query"))
    }

    field.resolve = enhancedResolve
  }
}
