describe('Posts', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })
  it('creates a post', async () => {
    const input = { title: 'title', body: 'body' }
    await subject().createService({ input })
    expect(mockManager.Post.createPost).toHaveBeenCalled()
  })

  it('updates a post', async () => {
    const input = { title: 'title', body: 'body' }
    await subject().updateService({ id: 1, input })
    expect(mockManager.Post.updatePost).toHaveBeenCalled()
  })

  it('deletes a post', async () => {
    await subject().deleteService({ id: 1 })
    expect(mockManager.Post.deletePost).toHaveBeenCalled()
  })

  it('gets all posts', async () => {
    await subject().postsService()
    expect(mockManager.Post.posts).toHaveBeenCalled()
  })

  it('gets a single post', async () => {
    await subject().postService({ id: 1 })
    expect(mockManager.Post.post).toHaveBeenCalled()
  })

  it('gets author of post', async () => {
    await subject().getUserService({ id: 1 })
    expect(mockManager.Post.user).toHaveBeenCalled()
  })
})

export {}
const subject = () => {
  jest.mock('src/lib/post_manager', () => mockManager)

  return require('./posts')
}

const mockManager = {
  Post: {
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
    post: jest.fn(),
    posts: jest.fn(),
    user: jest.fn(),
  },
}
