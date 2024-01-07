import OpenAI from 'openai'

import { Post } from 'src/lib/post_manager'
const openai = new OpenAI()

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
  const posts = await Post.posts()
  return posts
}

export const postService = async ({ id }) => {
  return await Post.post({ id })
}

export const generatePost = async ({ topic }) => {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content:
          'useLLM is a React library that lets you integrate large language models like OpenAIs ChatGPT and add AI-powered features into your React app with just a few lines of code. It supports message streaming, prompt engineering, audio transcription, text-to-speech,and much more right out of the box, offers powerful abstractions for building complex AI apps. You can read the docs and try out live demos',
      },
      {
        role: 'user',
        content: `Youre a blog posts writer bot. Given a topic, generate a blog post on topic: ${topic}`,
      },
      {
        role: 'user',
        content: `do not write the word Title before beginning a blog`,
      },
    ],
    model: 'gpt-3.5-turbo',
  })

  const blog = completion.choices[0].message.content
  console.log(blog)
  return blog
}
