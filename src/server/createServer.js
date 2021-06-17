import { ApolloServer } from "apollo-server-express"

import mock from "./db/mock.js"
import typeDefs from "./types/index.js"
import createContext from "./context/index.js"
import * as exportedResolvers from "./resolvers/index.js"
import * as exportedDirectives from "./directives/index.js"

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
    // TODO: Bring in the @graphql-tools file-loader, so that resolver exports
    // isn't such a manual process or would require ommitting the module prototype here (via object destructuring)
    resolvers: { ...exportedResolvers },
    schemaDirectives: { ...exportedDirectives }
  })
}
