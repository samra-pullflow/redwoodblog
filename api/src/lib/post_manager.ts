import { db } from 'src/lib/db'

export const Post = {
  posts: async () => {
    console.log('data retreived from manager')
    return await db.post.findMany()
  },

  post: async ({ id }) => {
    return await db.post.findUnique({
      where: { id },
    })
  },

  createPost: async ({ input }) => {
    return await db.post.create({ data: input })
  },

  updatePost: async ({ id, input }) => {
    return await db.post.update({ where: { id }, data: input })
  },

  deletePost: async ({ id }) => {
    return await db.post.delete({ where: { id } })
  },
}
