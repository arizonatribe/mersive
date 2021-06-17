import { ApolloServer } from "apollo-server-express"

import mock from "./db/mock.js"
import typeDefs from "./types/index.js"
import createContext from "./context/index.js"
import * as resolvers from "./resolvers/index.js"
import * as schemaDirectives from "./directives/index.js"
import { willSendResponse } from "./context/willSendResponse.js"

/**
 * Creates an instance of apollo server
 *
 * @function
 * @name createApolloServer
 * @param {Object<string, string>} config The db configuration details
 * @returns {Object<string, any>} The instance of Apollo GraphQL server
 */
export default function createApolloServer(config = {}) {
  return new ApolloServer({
    plugins: [{ requestDidStart: () => ({ willSendResponse }) }],

    ...(config.shouldMockResolvers && { mock }),

    /*
     * Apollo server provides this so you can inject common (non-importable) dependencies into all the resolvers/directives
     * These dependencies are usually derived from the app config and/or the inbound request
     * (rather than dependencies you can import)
     */
    async context({ req = {} }) {
      return createContext(config, req)
    },

    typeDefs,
    resolvers: { ...resolvers },
    schemaDirectives: { ...schemaDirectives }
  })
}
