import { GraphQLScalarType, GraphQLError, Kind } from "graphql"

/**
 * A custom GraphQLScalarType which ensures a value is non-negative integer
 *
 * @class
 * @name NonNegativeIntType
 */
export const NonNegativeInt = new GraphQLScalarType({
  name: "NonNegativeInt",

  description: "Ensures a value is in a non-negative integer",

  serialize(value) {
    if (!(value >= 0)) {
      throw new TypeError(`Must be an integer value greater than or equal to zero: ${value}`)
    }
    return value
  },

  parseValue(value) {
    if (!(value >= 0)) {
      throw new TypeError(`Must be an integer value greater than or equal to zero: ${value}`)
    }
    return value
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Only integer values are acceptable as non-negative int values, but this field is type: ${ast.kind}`
      )
    }
    if (!(ast.value >= 0)) {
      throw new TypeError(`Must be an integer value greater than or equal to zero: ${ast.value}`)
    }
    return ast.value
  }
})
