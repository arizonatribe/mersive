import faker from "faker"
import pkg from "../../../package.json"

const createDevice = () => ({
  id: faker.datatype.number(),
  email: faker.internet.email(),
  isCurrent: faker.datatype.boolean(),
  inProgress: faker.datatype.boolean()
})

export default {
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
