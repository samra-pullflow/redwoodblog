import { Box, Heading } from '@chakra-ui/react'
import type { CreatePostInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import PostForm from 'src/components/Post/PostForm'

const CREATE_POST_MUTATION = gql`
  mutation CreatePostMutation($input: CreatePostInput!) {
    createService(input: $input) {
      id
    }
  }
`

export const NewPost = () => {
  const [createService, { loading, error }] = useMutation(
    CREATE_POST_MUTATION,
    {
      onCompleted: () => {
        toast.success('Post created')
        navigate(routes.posts())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreatePostInput) => {
    createService({ variables: { input } })
  }

  return (
    <Box className="rw-segment">
      <Box as="header" className="rw-segment-header">
        <Heading as="h2" className="rw-heading rw-heading-secondary">
          New Post
        </Heading>
      </Box>
      <Box className="rw-segment-main">
        <PostForm onSave={onSave} loading={loading} error={error} />
      </Box>
    </Box>
  )
}

export default NewPost
