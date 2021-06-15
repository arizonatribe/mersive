import envalid from "envalid"

const { bool, str, port } = envalid

export default envalid.cleanEnv(process.env, {
  PRETTY_PRINT: bool({
    default: false,
    desc: "Whether or not to format the stdout/stderr logs in a visually styled manner (mainly for local development)."
  }),
  HOST: str({
    desc: "The host/hostname for the application (without the transport protocol prefix)",
    default: "localhost"
  }),
  NODE_ENV: str({
    desc: "The environment where this application is running",
    default: "development",
    choices: ["development", "production"]
  }),
  LOG_LEVEL: str({
    default: "info",
    desc: "The logging threshold level",
    choices: ["trace", "debug", "info", "warn", "error", "fatal"]
  }),
  JWT_SECRET: str({
    default: "stubbed-for-coding-exercise",
    desc: "A secret value used when the server signs (and verifies) JWT access tokens",
    docs: "https://stackoverflow.com/questions/42826251/what-should-be-the-secret-in-jwt#answer-42826453"
  }),
  DB_HOST: str({
    default: "",
    desc: "The host/hostname for the database connection"
  }),
  DB_USERNAME: str({
    default: "",
    desc: "The username for the database connection"
  }),
  DB_PASSWORD: str({
    default: "",
    desc: "The password for the database connection"
  }),
  DB_FILENAME: str({
    default: "database.db",
    desc: "An alternative to user/password DB connections (ie for sqlite3)"
  }),
  PORT: port({
    default: 4000,
    example: 4000,
    desc: "The port on which this application runs"
  })
}, {
  dotEnvPath: /^production$/.test(process.env.NODE_ENV)
    ? ".env.prod"
    : ".env"
})
