import express from "express"
import appConfig from "./config/index.js"
import createServer from "./createServer.js"

/**
 * A function which creates the ExpressJs application and sets up the GraphQL ApolloServer instance and wires it into the connect middleware
 *
 * @function
 * @name startServer
 * @param {Object<string, string|number|boolean>} [config] The database connection configuration details
 */
export async function startServer(config = {}) {
  const { host, port } = config
  const server = createServer(config)

  await server.start()

  const app = express()
  server.applyMiddleware({ app })
  app.listen({ port })

  /* eslint-disable-next-line no-console */
  console.log(`GraphQL server ready at http://${host}:${port}${server.graphqlPath}`)
}

startServer(appConfig)
