export const Mutation = {
  /**
   * Logs in a user by their credentials and issues an access token in return
   *
   * @function
   * @name login
   * @param {null} _ The parent source object (not used for root level Queries/Mutations)
   * @param {Object<string, any>} args GraphQL args provided to the query
   * @param {string} args.email The email address for an existing user
   * @param {string} args.password The password for an existing user
   * @param {Object<string, function>} context.dbClient The database client
   * @param {function} context.dbClient.authenticateUser An async method which authenticates a user by their email and password
   * @returns {Promise<string>} A new access token
   */
  async login(_, { email, password }, { dbClient }) {
    return dbClient.authenticateUser(email, password)
  }
}
