import OpenAI from 'openai'

const openai = new OpenAI()
import { Post } from 'src/lib/post_manager'

export const createService = async ({
  input,
}: {
  input: { title: 'title'; body: 'body' }
}) => {
  return await Post.createPost({ input })
}

export const updateService = async ({ id, input }) => {
  return await Post.updatePost({ id, input })
}

export const deleteService = async ({ id }) => {
  return await Post.deletePost({ id })
}

export const postsService = async () => {
  const posts = await Post.posts()
  return posts
}

export const postService = async ({ id }) => {
  return await Post.post({ id })
}

export const getUserService = async ({ id }) => {
  Post.user({ postId: id })
}

export const generatePost = async ({ topic }) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: 'Generates a blog post of 10 lines',
      },
      {
        role: 'user',
        content: `You are a blog posts writer bot. Given a topic, generate a blog post on topic: ${topic}`,
      },
      {
        role: 'user',
        content: `do not write the word Title before beginning a blog`,
      },
    ],
    model: 'gpt-3.5-turbo',
  })

  const blog = completion.choices[0].message.content
  return blog
}
