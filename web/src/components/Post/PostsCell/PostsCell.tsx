import { Box } from '@chakra-ui/react'
import type { FindPosts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Posts from 'src/components/Post/Posts'

export const QUERY = gql`
  query FindPosts {
    postsService {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <Box>Loading...</Box>

export const Empty = () => {
  return (
    <Box className="rw-text-center">
      {'No posts yet. '}
      <Link to={routes.newPost()} className="rw-link">
        {'Create one?'}
      </Link>
    </Box>
  )
}

export const Failure = ({ error }: CellFailureProps) => {
  {
    console.log('failure')
  }
  return <Box>{error?.message}</Box>
}

export const Success = ({ postsService }: CellSuccessProps<FindPosts>) => {
  console.log('posts', postsService)
  return <Posts posts={postsService} />
}
