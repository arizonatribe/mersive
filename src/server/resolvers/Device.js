export default {
  lastUpdatedAt({ lastUpdatedAt }) {
    const toMs = val => (
      `${Date.now()}`.length === `${val}`.length
        ? val
        : `${Date.now()}`.length === `${val * 1000}`.length
          ? val * 1000
          : undefined
    )

    return (typeof lastUpdatedAt === "number")
      ? toMs(lastUpdatedAt)
      : !Number.isNaN(+lastUpdatedAt)
        ? toMs(+lastUpdatedAt)
        : null
  },
  async user({ email }, _, { dbClient }) {
    if (email) {
      return dbClient.findUserByEmail(email)
    }
    return null
  }
}
