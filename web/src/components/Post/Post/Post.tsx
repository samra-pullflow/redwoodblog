import {
  Box,
  Heading,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import type { DeletePostMutationVariables, FindPostById } from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { timeTag } from 'src/lib/formatters'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deleteService(id: $id) {
      id
    }
  }
`
interface Props {
  post: NonNullable<FindPostById['post']>
}

const Post = ({ post }: Props) => {
  const [deleteService] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
      navigate(routes.posts())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deleteService({ variables: { id } })
    }
  }

  return (
    <>
      <Box className="rw-segment">
        <Box as="header" className="rw-segment-header">
          <Heading className="rw-heading rw-heading-secondary">
            Post {post.id} Detail
          </Heading>
        </Box>
        <Table className="rw-table">
          <Tbody>
            <Tr>
              <Th>Id</Th>
              <Td>{post.id}</Td>
            </Tr>
            <Tr>
              <Th>Title</Th>
              <Td>{post.title}</Td>
            </Tr>
            <Tr>
              <Th>Body</Th>
              <Td>{post.body}</Td>
            </Tr>
            <Tr>
              <Th>Created at</Th>
              <Td>{timeTag(post.createdAt)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <ButtonGroup className="rw-button-group">
        <Button type="button" className="rw-button rw-button-blue">
          <Link to={routes.editPost({ id: post.id })}>Edit</Link>
        </Button>
        <Button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(post.id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </>
  )
}

export default Post
