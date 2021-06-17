import { toDate} from "../../helpers/index.js"

export default {
  lastUpdatedAt({ lastUpdatedAt }) {
    const dt = toDate(lastUpdatedAt)
    if (dt) {
      return dt.valueOf()
    }
    return dt
  },
  async user({ email }, _, { loaders }) {
    if (email) {
      return loaders.users.load(email)
    }
    return null
  }
}
