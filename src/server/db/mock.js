import faker from "faker"
import { createJwt, decodeJwt, validateJwt } from "../helpers/index.js"
import pkg from "../../../package.json"

const createDevice = () => ({
  id: faker.datatype.number(),
  email: faker.internet.email(),
  isCurrent: faker.datatype.boolean(),
  inProgress: faker.datatype.boolean()
})

export default {
  Query: () => ({
    verifyToken(_, { token }) {
      return validateJwt(token, process.env.JWT_SECRET)
        ? decodeJwt(token)
        : null
    }
  }),
  Mutation: () => ({
    login(_, { email }) {
      return createJwt(
        {},
        process.env.JWT_SECRET, {
          subject: email,
          audience: `http://${process.env.HOST || "localhost"}:${process.env.PORT || 4000}`,
          issuer: pkg.name
        }
      )
    }
  }),
  DecodedJwt: () => ({
    iat: faker.date.recent().valueOf(),
    sub: faker.internet.email(),
    exp: faker.date.soon().valueOf(),
    iss: pkg.name,
    aud: `http://${process.env.HOST || "localhost"}:${process.env.PORT || 4000}`
  }),
  User: () => ({
    email: faker.internet.email(),
    permissions: ["update", "delete"][Math.floor(Math.random() * 2)],
    canPerformUpdates: faker.datatype.boolean(),
    isSubscriptionExpired: faker.datatype.boolean(),
    devices: Array(faker.datatype.number({ min: 0, max: 10 }))
      .fill("")
      .map(createDevice)
  }),
  Device: createDevice
}
