import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { isPassword } from "../../helpers/index.js"

/**
 * A custom GraphQLScalarType which ensures a value is a password
 *
 * @class
 * @name PasswordType
 */
export default new GraphQLScalarType({
  name: "Password",

  description: "Ensures a value is in the proper format for a password",

  serialize(value) {
    if (!isPassword(value)) {
      throw new TypeError([
        "Password is not in a valid format",
        "Should be a mix of alpha-numeric (mixed case) and at least one symbol",
        "Should be at least 8 characters total as well"
      ].join(". "))
    }
    return value.trim()
  },

  parseValue(value) {
    if (!isPassword(value)) {
      throw new TypeError([
        "Password is not in a valid format",
        "Should be a mix of alpha-numeric (mixed case) and at least one symbol",
        "Should be at least 8 characters total as well"
      ].join(". "))
    }
    return value.trim()
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Only string values are acceptable as passwords, but this field is type: ${ast.kind}`
      )
    }
    if (!isPassword(ast.value)) {
      throw new TypeError([
        "Password is not in a valid format",
        "Should be a mix of alpha-numeric (mixed case) and at least one symbol",
        "Should be at least 8 characters total as well"
      ].join(". "))
    }
    return ast.value.trim()
  }
})
