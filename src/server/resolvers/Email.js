import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { isEmail } from "../../helpers/index.js"

/**
 * A custom GraphQLScalarType which ensures a value is an email address
 *
 * @class
 * @name EmailType
 */
export default new GraphQLScalarType({
  name: "Email",

  description: "Ensures a value is in the proper format for an email address",

  serialize(value) {
    if (!isEmail(value)) {
      throw new TypeError(`The email is not in a valid format: '${value}'`)
    }
    return value.trim()
  },

  parseValue(value) {
    if (!isEmail(value)) {
      throw new TypeError(`The email is not in a valid format: '${value}'`)
    }
    return value.trim()
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Only string values are acceptable as email addresses, but this field is type: ${ast.kind}`
      )
    }
    if (!isEmail(ast.value)) {
      throw new TypeError(`The email is not in a valid format: '${ast.value}'`)
    }
    return ast.value.trim()
  }
})
