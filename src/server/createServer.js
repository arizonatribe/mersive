import { ApolloServer } from "apollo-server-express"
import createLogger from "pino"
import { decodeJwt } from "./helpers/index.js"
import createDbClient from "./db/client.js"
import * as exportedResolvers from "./resolvers/index.js"
import * as exportedDirectives from "./directives/index.js"
import typeDefs from "./types/index.js"

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
  const context = {
    config,
    logger,
    dbClient: createDbClient(config, logger)
  }

  return new ApolloServer({
    async context({ req = {} }) {
      const authHeader = req.headers?.Authorization || req.headers?.authorization
      /* If there's an authorization header, attempt to decode it and look-up the corresponding user */
      if (/^Bearer\s/.test(authHeader)) {
        const [_, token] = authHeader.split(/\s/).filter(Boolean)
        const { sub: email } = decodeJwt(token)
        const user = await context.dbClient.findUserByEmail(email)
        return { token, user, ...context }
      }

      return context
    },

    typeDefs,
    // TODO: Bring in the @graphql-tools file-loader, so that resolver exports
    // isn't such a manual process or would require ommitting the module prototype here
    resolvers: { ...exportedResolvers },
    schemaDirectives: { ...exportedDirectives }
  })
}
