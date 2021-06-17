export default {
  isSubscriptionExpired({ isSubscriptionExpired }) {
    return /^(1|true)$/i.test(isSubscriptionExpired)
  },
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
