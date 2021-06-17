import Types from "../../jsdoc.typedefs.js"
import { is500LevelError, is400LevelError } from "../../helpers/index.js"

/**
 * A global response handler which will set response codes and catch (potentially) sensitive error messages and censor them (but will still log them).
 *
 * @function
 * @name willSendResponse
 * @param {Object<string, any>} response The outbound HTTP response
 * @param {Object<Array<Types.GraphQLError>>} [response.errors] GraphQL errors to parse
 * @param {Object<string, function>} context.logger The threshold based logger
 */
export function willSendResponse({ response, context: { logger } }) {
  logger.info("sending response")
  if (response && response.errors) {
    response.errors
      .filter(err => err.extensions && err.extensions.code)
      .forEach(err => {
        if (is400LevelError(err.extensions.code) || is500LevelError(err.extensions.code)) {
          response.http.status = +err.extensions.code
          response.data = undefined
        }

        if (is500LevelError(err.extensions.code)) {
          err.message = "The server encountered a problem. Please have an administrator check the logs for details"
        }

        logger.error(err)
      })
  }
}
