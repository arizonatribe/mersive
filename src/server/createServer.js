import { ApolloServer } from "apollo-server-express"
import createLogger from "pino"
import * as schemaDirectives from "./directives"
import createDbClient from "./db/client"
import resolvers from "./resolvers"
import typeDefs from "./types"

/**
 * Creates an instance of apollo server
 *
 * @function
 * @name createApolloServer
 * @param {Object<string, string>} config The db configuration details
 * @returns {Object<string, any>} The instance of Apollo GraphQL server
 */
export default function createApolloServer(config = {}) {
  const { name, level, shouldPrettyPrint } = config

  const logger = createLogger({ level, prettyPrint: shouldPrettyPrint, name })
  const context = { logger, dbClient: createDbClient(config, logger) }

  return new ApolloServer({
    context,
    typeDefs,
    resolvers,
    schemaDirectives
  })
}
