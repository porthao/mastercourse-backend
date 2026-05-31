export const postSchema = `
type Post {
id: String
title: String
content: String
published: Boolean
author_id: Int
author: User
createdAt: Date
updatedAt: Date
}

input PostQueryInput {
keyword: String
author_id: Int
published: Boolean
page: Int
limit: Int
}

type PostManyResponse {
  success: Boolean
  message: String
  data: [Post]
  pagination: PaginationMeta
}

type PostOneResponse {
success: Boolean!
message: String
data: Post
}


type Query {
posts(data: PostQueryInput): PostManyResponse
post(id: Int!): PostOneResponse
}


input CreatePostInput {
  title: String!
  content: String
  published: Boolean
}
input UpdatePostInput {
  title: String
  content: String
  published: Boolean
}
  
type Mutation {
createPost(data: CreatePostInput!): PostOneResponse
updatePost(id: Int, data: UpdatePostInput): PostOneResponse
deletePost(id: Int): PostOneResponse
}
`;
