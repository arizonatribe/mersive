import { toDate} from "../../helpers/index.js"

export default {
  lastUpdatedAt({ lastUpdatedAt }) {
    const dt = toDate(lastUpdatedAt)
    if (dt) {
      return dt.valueOf()
    }
    return dt
  },
  async user({ email }, _, { dbClient }) {
    if (email) {
      return dbClient.findUserByEmail(email)
    }
    return null
  }
}
