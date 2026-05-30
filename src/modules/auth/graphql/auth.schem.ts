export const authSchema = `#graphql
input LoginInput {
email: String!
password: String!
}

type JwtPayload {
accessToken: String
user: User
}

type LoginRespone {
success: Boolean!
message: String
data: JwtPayload
}

input RegisterInput {
name: String!
email: String!
password: String!
}

type RegisterResponse {
success: Boolean!
message: String
data: User
}

extend type Mutation {
login(data: LoginInput!): LoginRespone
register(data: RegisterInput): RegisterResponse
}
`;
