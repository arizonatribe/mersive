export const Device = {
  async user({ email }, _, { dbClient }) {
    if (email) {
      return dbClient.findUserByEmail(email)
    }
    return null
  }
}
