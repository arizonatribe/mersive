export const User = {
  canPerformUpdates(user) {
    return Boolean(
      (user && user.isAdmin)
      || (user.permissions || []).includes("update")
    )
  }
}
