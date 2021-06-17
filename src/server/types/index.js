import { gql } from "apollo-server-express"

export default gql`
  directive @isAdmin on QUERY | FIELD | FIELD_DEFINITION
  directive @isAuthenticated on QUERY | FIELD | FIELD_DEFINITION
  directive @isDeviceUser on QUERY | FIELD | FIELD_DEFINITION

  scalar Email
  scalar Password
  scalar Jwt
  scalar Semver
  scalar PositiveInt
  scalar NonNegativeInt

  enum Permission {
    delete
    update
  }

  type DecodedJwt {
    # The issuer of the token
    iss: String
    # The intended audience of the token
    aud: String
    # The subject of the token
    sub: String
    # The expiration for the token
    exp: Float
    # The time the token was issued
    iat: Float
  }

  type User {
    email: Email!
    devices: [Device]
    permissions: [Permission]
    canPerformUpdates: Boolean
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
    # The owner of the device
    user: User
    lastUpdatedAt: Float
  }

  type Query {
    # Retrieves the full list of all users
    users: [User!]! @isAdmin
    # Retrieves the full list of all devices
    devices: [Device!]! @isAdmin
    # Retrieves the devices associated with a given user
    getDevicesByEmail(email: Email!): [Device] @isDeviceUser
    # Retrieves a user record by their unique email address
    getUserByEmail(email: Email!): User @isAdmin
    # Retrieves a device record by its unique ID
    getDeviceById(id: PositiveInt!): Device @isDeviceUser
    # Retrieves a list of users whose subscription has ended
    getExpiredUsers: [User] @isAdmin
    # Retrieves the latest firmware version
    getLatestFirmwareVersion: Semver
    # Validates an access token, making sure it was issued by this server and hasn't expired
    verifyToken(token: Jwt!): DecodedJwt
  }

  type Mutation {
    # Registered users authenticate with their email and password
    login(email: Email!, password: Password!): Jwt
  }
`
