import { db } from 'src/lib/db'

export const Post = {
  posts: async () => {
    console.log('data retreived from manager')
    return await db.post.findMany({
      // where: { userId: context.currentUser.id },
      include: {
        user: true,
      },
    })
  },

  post: async ({ id }) => {
    return await db.post.findUnique({
      where: { id, userId: context.currentUser.id },
      include: {
        user: true,
      },
    })
  },

  createPost: async ({ input }) => {
    return await db.post.create({
      data: { ...input, userId: context.currentUser.id },
    })
  },

  updatePost: async ({ id, input }) => {
    return await db.post.update({ where: { id }, data: input })
  },

  deletePost: async ({ id }) => {
    return await db.post.delete({ where: { id } })
  },

  user: ({ postId }) => {
    db.post.findFirst({ where: { id: postId } }).user()
  },
}
