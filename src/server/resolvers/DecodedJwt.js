export default {
  iat({ iat }) {
    return iat ? iat * 1000 : iat
  },
  exp({ exp }) {
    return exp ? exp * 1000 : exp
  }
}
