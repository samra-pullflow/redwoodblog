import type { Post } from '@prisma/client'
import {
  postsService,
  postService,
  createService,
  updateService,
  deleteService,
  generatePost,
} from 'api/src/services/posts/posts'

// import type { StandardScenario } from '../services/posts/posts.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations
const Post = {
  createService: jest.fn(),
  updateService: jest.fn(),
  deletePost: jest.fn(),
  postsService: jest.fn(),
  postService: jest.fn(),
}

describe('Post Services', () => {
  // Mock Post manager functions or use a testing database setup if needed
  jest.mock('api/src/services/posts/posts', () => Post)

  describe('createService', () => {
    it('should create a post', async () => {
      const input = {
        title: 'new title',
        body: 'body',
      }

      const result = await createService({ input })

      expect(result).toEqual({
        id: 1,
        title: 'new title',
        body: 'body',
        createdAt: expect.any(Date),
      })
    })
  })

  describe('postsService', () => {
    it('should return an array of posts', async () => {
      const expectedResult = [
        {
          id: 1,
          title: 'Post 1',
          body: 'Body of post 1',
          createdAt: new Date(),
        },
        {
          id: 2,
          title: 'Post 2',
          body: 'Body of post 2',
          createdAt: new Date(),
        },
      ]

      Post.postsService.mockResolvedValueOnce(expectedResult)

      const result = await postsService()
      console.log(result)
      // expect(postsService).toHaveBeenCalled()

      expect(result).toEqual(expectedResult)
    })
  })

  // describe('post', () => {
  //   it('should return a single post by id', async () => {
  //     const postId = 1

  //     const expectedResult = {
  //       id: 1,
  //       title: 'Post 1',
  //       body: 'Body of post 1',
  //       createdAt: new Date(),
  //     }

  //     postService.mockResolvedValueOnce(expectedResult)
  //     const result = await postService({ id: postId })

  //     expect(postService).toHaveBeenCalledWith({ id: postId })
  //     expect(result).toEqual(expectedResult)
  //   })
  // })
})

// describe('generatePost', () => {
//   it('should generate a blog post', async () => {
//     const topic = 'yourTopic'

//     const result = await generatePost({ topic })

//     expect(result).toBeDefined()
//   })
// })

// describe('posts', () => {
//   scenario('returns all posts', async (scenario: StandardScenario) => {
//     const result = await postsService()

//     expect(result.length).toEqual(Object.keys(scenario.post).length)
//   })

//   scenario('returns a single post', async (scenario: StandardScenario) => {
//     const result = await postService({ id: scenario.post.one.id })

//     expect(result).toEqual(scenario.post.one)
//   })

//   scenario('creates a post', async () => {
//     const result = await createPost({
//       input: { title: 'String', body: 'String' },
//     })

//     expect(result.title).toEqual('String')
//     expect(result.body).toEqual('String')
//   })

//   scenario('updates a post', async (scenario: StandardScenario) => {
//     const original = (await post({ id: scenario.post.one.id })) as Post
//     const result = await updatePost({
//       id: original.id,
//       input: { title: 'String2' },
//     })

//     expect(result.title).toEqual('String2')
//   })

//   scenario('deletes a post', async (scenario: StandardScenario) => {
//     const original = (await deletePost({ id: scenario.post.one.id })) as Post
//     const result = await post({ id: original.id })

//     expect(result).toEqual(null)
//   })
// })
