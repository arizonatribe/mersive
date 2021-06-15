import { GraphQLScalarType, GraphQLError, Kind } from "graphql"

/**
 * A custom GraphQLScalarType which ensures a value is positive integer
 *
 * @class
 * @name PositiveIntType
 */
export const PositiveInt = new GraphQLScalarType({
  name: "PositiveInt",

  description: "Ensures a value is in a positive integer",

  serialize(value) {
    if (!(value >= 0)) {
      throw new TypeError(`Must be an integer value greater than zero: ${value}`)
    }
    return value
  },

  parseValue(value) {
    if (!(value >= 0)) {
      throw new TypeError(`Must be an integer value greater than zero: ${value}`)
    }
    return value
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.INT) {
      throw new GraphQLError(
        `Only integer values are acceptable as positive int values, but this field is type: ${ast.kind}`
      )
    }
    if (!(ast.value >= 0)) {
      throw new TypeError(`Must be an integer value greater than zero: ${ast.value}`)
    }
    return ast.value
  }
})
