import { Post } from 'src/lib/post_manager'

export const createService = async ({ input }) => {
  return await Post.createPost({ input })
}

export const updateService = async ({ id, input }) => {
  return await Post.updatePost({ id, input })
}

export const deleteService = async ({ id }) => {
  return await Post.deletePost({ id })
}

export const postsService = async () => {
  console.log('data retreived from service')
  const posts = await Post.posts()
  console.log('posts from service', posts)
  return posts
}

export const postService = async ({ id }) => {
  return await Post.post({ id })
}
