import pkg from "../../../package.json"
import env from "./env"
import Types from "../jsdoc.typedefs"

const connection = env.DB_HOST && env.DB_PASSWORD && env.DB_USERNAME
  ? { user: env.DB_USERNAME, password: env.DB_PASSWORD, host: env.DB_HOST }
  : { filename: env.DB_FILENAME }

/**
 * The application configuration object
 *
 * @typedef {Object<string, number|boolean|string>} ServerConfig
 * @property {string} level The logging threshold level
 * @property {string} host The host/hostname for the application (without the transport protocol prefix)
 * @property {boolean} isProduction Whether or not this application is running in production
 * @property {string} version The semantic version of the application
 * @property {string} name The name of the application
 * @property {boolean} [shouldPrettyPrint] Whether or not to format the stdout/stderr logs in a visually styled manner (mainly for local development).
 * @property {Types.DbConnection} config The databse connection configuration
 * @property {string} clientName The database client type (ie, postgres 'pg' or 'sqlite3')
 */
export default {
  connection,
  name: pkg.name,
  version: pkg.version,
  shouldPrettyPrint: env.PRETTY_PRINT,
  host: env.HOST,
  port: env.PORT,
  level: env.LOG_LEVEL,
  isProduction: env.NODE_ENV === "production",
  clientName: connection.filename ? "sqllite3" : "pg"
}
