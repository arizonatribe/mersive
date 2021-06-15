import { gql } from "apollo-server-express"

export default gql`
  scalar Email
  scalar Semver
  scalar NonNegativeInt
  scalar PositiveInt

  enum Permission {
    delete
    update
  }

  type User {
    id: ID!
    name: String!
    email: String!
    permissions: [Permission]
    canPerformUpdates: Boolean
    devices: [Device]
    # Whether the user's device subscription has ended
    isSubscriptionExpired: Boolean
  }

  type Device {
    id: PositiveInt!
    name: String!
    # The device's firmware version
    version: Semver
    # Whether this device is one the most current firmware version
    isCurrent: Boolean
    # Whether this device is currently being updated
    inProgress: Boolean
  }

  type Query {
    # Retrieves the full list of all users
    users: [User]
    # Retrieves the full list of all devices
    devices: [Device!]!
    # Retrieves the latest firmware version
    getLatestFirmwareVersion: Semver
    # Retrieves the devices associated with a given user
    getDevicesByEmail(email: Email!): [Device]
    # Retrieves a user record by their unique email address
    getUserByEmail(email: Email!): User
    # Retrieves a device record by its unique ID
    getDeviceById(id: PositiveInt!): Device
  }
`
