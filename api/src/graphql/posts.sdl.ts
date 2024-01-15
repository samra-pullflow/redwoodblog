export const schema = gql`
  type Post {
    id: Int!
    title: String!
    body: String!
    createdAt: DateTime
    user: User!
  }

  type Query {
    postsService: [Post!]! @skipAuth
    postService(id: Int!): Post @skipAuth
    generatePost(topic: String!): String @skipAuth
  }

  input CreatePostInput {
    title: String!
    body: String!
  }

  input UpdatePostInput {
    title: String
    body: String
  }

  type Mutation {
    createService(input: CreatePostInput!): Post! @requireAuth
    updateService(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deleteService(id: Int!): Post! @requireAuth
  }
`
