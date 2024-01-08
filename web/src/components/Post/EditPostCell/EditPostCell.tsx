import { Box, Heading } from '@chakra-ui/react'
import type { EditPostById, UpdatePostInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostForm from 'src/components/Post/PostForm'

export const QUERY = gql`
  query EditPostById($id: Int!) {
    postService(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`
const UPDATE_POST_MUTATION = gql`
  mutation UpdatePostMutation($id: Int!, $input: UpdatePostInput!) {
    updateService(id: $id, input: $input) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <Box>Loading...</Box>

export const Failure = ({ error }: CellFailureProps) => (
  <Box className="rw-cell-error">{error?.message}</Box>
)

export const Success = ({ postService }: CellSuccessProps<EditPostById>) => {
  const [updateService, { loading, error }] = useMutation(
    UPDATE_POST_MUTATION,
    {
      onCompleted: () => {
        toast.success('Post updated')
        navigate(routes.posts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: UpdatePostInput, id: EditPostById['post']['id']) => {
    updateService({ variables: { id, input } })
  }

  return (
    <Box>
      <Heading as="h2" fontSize="md" mb={4} textAlign="center">
        Edit Post {postService?.id}
      </Heading>
      <Box>
        <PostForm
          post={postService}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </Box>
    </Box>
  )
}
