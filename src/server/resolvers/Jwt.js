import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { isJwtExpired, decodeJwt } from "../../helpers/index.js"

/**
 * A custom GraphQLScalarType which ensures a value is a JWT access token
 *
 * @class
 * @name JwtType
 */
export default new GraphQLScalarType({
  name: "Jwt",

  description: "Ensures a value is in the proper format to be a JWT access token",

  serialize(value) {
    if (!decodeJwt(value)) {
      throw new TypeError(`The JWT is not in a valid format: '${value}'`)
    }
    if (isJwtExpired(value)) {
      throw new TypeError("The JWT has expired")
    }
    return value.trim()
  },

  parseValue(value) {
    if (!decodeJwt(value)) {
      throw new TypeError(`The JWT is not in a valid format: '${value}'`)
    }
    if (isJwtExpired(value)) {
      throw new TypeError("The JWT has expired")
    }
    return value.trim()
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Only string values are acceptable as JWTs, but this field is type: ${ast.kind}`
      )
    }
    if (!decodeJwt(ast.value)) {
      throw new TypeError(`The JWT is not in a valid format: '${ast.value}'`)
    }
    if (isJwtExpired(ast.value)) {
      throw new TypeError("The JWT has expired")
    }
    return ast.value.trim()
  }
})
