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
      <Box>
        <Box as="header">
          <Heading as="h2" fontSize="l" mt="4" color="gray.700">
            Post {post.id} Details
          </Heading>
        </Box>
        <Table variant="striped" colorScheme="purple" mt="4">
          <Tbody>
            <Tr>
              <Th fontSize="sm" fontWeight="bold" color="gray.700">
                Id
              </Th>
              <Td>{post.id}</Td>
            </Tr>
            <Tr>
              <Th fontSize="sm" fontWeight="bold" color="gray.700">
                Title
              </Th>
              <Td>{post.title}</Td>
            </Tr>
            <Tr>
              <Th fontSize="sm" fontWeight="bold" color="gray.700">
                Body
              </Th>
              <Td>{post.body}</Td>
            </Tr>
            <Tr>
              <Th fontSize="sm" fontWeight="bold" color="gray.700">
                Created at
              </Th>
              <Td>{timeTag(post.createdAt)}</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
      <ButtonGroup mt="4">
        <Button colorScheme="blue" size="sm">
          <Link to={routes.editPost({ id: post.id })}>Edit</Link>
        </Button>
        {/* <Button
          colorScheme="red"
          size="sm"
          onClick={() => onDeleteClick(post.id)}
        >
          Delete
        </Button> */}
      </ButtonGroup>
    </>
  )
}

export default Post
