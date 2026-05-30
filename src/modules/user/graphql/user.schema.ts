export const userSchema = `
type User {
id: String
name: String
email: String
role: String
createdAt: Date
updatedAt: Date
}

type UserOneRespone {
success: Boolean!
message: String
data: User
}


type Query {
user(id: Int!): UserOneRespone
}
`;
