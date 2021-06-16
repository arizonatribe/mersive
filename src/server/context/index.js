import createLogger from "pino"
import createDbClient from "../db/client.js"
import { decodeJwt } from "../../helpers/index.js"

/**
 * Creates the dependencies and config values which are shared across GraphQL resolvers and directives
 *
 * @function
 * @name createContext
 * @param {Object<string, string|number|boolean|Object<string, string|number|boolean>>} config The app context configuration details
 * @param {Object<string, any>} req The inbound HTTP request (headers have to be parsed)
 * @param {Object<string, string>} req.headers The HTTP request headers
 * @param {Object<string, string>} req.headers.Authorization The HTTP request auth header (which might have a bearer token)
 * @returns {Promise<Object<string, any>>} The context object which is ready to be injected into the GraphQL resolvers via the Apollo server constructor function
 */
export default async function createContext(config = {}, req = {}) {
  const { level, shouldMockResolvers, shouldPrettyPrint, name } = config
  const logger = createLogger({ level, prettyPrint: shouldPrettyPrint, name })
  const context = {
    config,
    logger,
    dbClient: createDbClient(config, logger)
  }

  const authHeader = req.headers?.Authorization || req.headers?.authorization

  /* If there's an authorization header, attempt to decode it and look-up the corresponding user */
  if (/^Bearer\s/.test(authHeader)) {
    const [_, token] = authHeader.split(/\s/).filter(Boolean)
    const { sub: email } = decodeJwt(token)
    const user = shouldMockResolvers
      ? { email, isAdmin: true, canPerformUpdates: true, isSubscriptionExpired: false }
      : await context.dbClient.findUserByEmail(email)

    return { token, user, ...context }
  }

  return context
}
