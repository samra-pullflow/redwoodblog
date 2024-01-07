import { render } from '@redwoodjs/testing/web'

import GeneratePostPage from './GeneratePostPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GeneratePostPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GeneratePostPage />)
    }).not.toThrow()
  })
})
