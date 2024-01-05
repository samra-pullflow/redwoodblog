import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react'
import type { DeletePostMutationVariables, FindPosts } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Post/PostsCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_POST_MUTATION = gql`
  mutation DeletePostMutation($id: Int!) {
    deleteService(id: $id) {
      id
    }
  }
`

const PostsList = ({ posts }: FindPosts) => {
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    onCompleted: () => {
      toast.success('Post deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeletePostMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete post ' + id + '?')) {
      deletePost({ variables: { id } })
    }
  }

  return (
    <>
      <Box className="rw-segment rw-table-wrapper-responsive">
        <Table className="rw-table">
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Title</Th>
              <Th>Body</Th>
              <Th>Created at</Th>
              <Th>&nbsp;</Th>
            </Tr>
          </Thead>
          <Tbody>
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>{truncate(post.id)}</Td>
                <Td>{truncate(post.title)}</Td>
                <Td>{truncate(post.body)}</Td>
                <Td>{timeTag(post.createdAt)}</Td>
                <Td>
                  <Box className="rw-table-actions">
                    <Link
                      to={routes.post({ id: post.id })}
                      title={'Show post ' + post.id + ' detail'}
                      className="rw-button rw-button-small"
                    >
                      Show
                    </Link>
                    <Link
                      to={routes.editPost({ id: post.id })}
                      title={'Edit post ' + post.id}
                      className="rw-button rw-button-small rw-button-blue"
                    >
                      Edit
                    </Link>
                    <Button
                      type="button"
                      title={'Delete post ' + post.id}
                      className="rw-button rw-button-small rw-button-red"
                      onClick={() => onDeleteClick(post.id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <Box>
        <Flex justify="center" mt={4}>
          <Stack direction="row" spacing={4}>
            <Link to={routes.generatePost()}>
              <Button colorScheme="blue" size="lg">
                Generate Post Through AI
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Box>
    </>
  )
}

export default PostsList
