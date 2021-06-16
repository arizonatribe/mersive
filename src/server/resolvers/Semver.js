import { GraphQLScalarType, GraphQLError, Kind } from "graphql"
import { isSemver } from "../../helpers/index.js"

/**
 * A custom GraphQLScalarType which ensures a value is a semantic version
 *
 * @class
 * @name SemverType
 */
export const Semver = new GraphQLScalarType({
  name: "Semver",

  description: "Ensures a value is in the proper format for semantic version numbers",

  serialize(value) {
    if (!isSemver(value)) {
      throw new TypeError(`The semver is not in a valid format: '${value}'`)
    }
    return value.trim()
  },

  parseValue(value) {
    if (!isSemver(value)) {
      throw new TypeError(`The semver is not in a valid format: '${value}'`)
    }
    return value.trim()
  },

  parseLiteral(ast) {
    if (ast.kind !== Kind.STRING) {
      throw new GraphQLError(
        `Only string values are acceptable as semantic versions, but this field is type: ${ast.kind}`
      )
    }
    if (!isSemver(ast.value)) {
      throw new TypeError(`The semver is not in a valid format: '${ast.value}'`)
    }
    return ast.value.trim()
  }
})
