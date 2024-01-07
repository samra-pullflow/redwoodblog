import { Box } from '@chakra-ui/react'
import type { FindPostById } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Post from 'src/components/Post/Post'

export const QUERY = gql`
  query FindPostById($id: Int!) {
    postService(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <Box>Loading...</Box>

export const Empty = () => <Box>Post not found</Box>

export const Failure = ({ error }: CellFailureProps) => (
  <Box className="rw-cell-error">{error?.message}</Box>
)

export const Success = ({ postService }: CellSuccessProps<FindPostById>) => {
  return <Post post={postService} />
}
