export default {
  canPerformUpdates(user) {
    return Boolean(
      (user && user.isAdmin)
      || (user.permissions || []).includes("update")
    )
  },
  async devices(user, _, { loaders }) {
    return loaders.devices.load(user.email)
  }
}
