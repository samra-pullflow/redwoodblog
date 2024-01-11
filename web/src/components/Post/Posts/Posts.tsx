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

import { useAuth } from 'src/auth'
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
  const { currentUser } = useAuth()
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
      <Table variant="striped" colorScheme="purple">
        <Thead>
          <Tr>
            <Th fontSize="md" fontWeight="bold" color="gray.700">
              Id
            </Th>
            <Th fontSize="md" fontWeight="bold" color="gray.700">
              Title
            </Th>
            <Th fontSize="md" fontWeight="bold" color="gray.700">
              Body
            </Th>
            <Th fontSize="md" fontWeight="bold" color="gray.700">
              Created at
            </Th>
            <Th fontSize="md" fontWeight="bold" color="gray.700">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((post) => (
            <Tr key={post.id}>
              <Td fontFamily="serif">{truncate(post.id)}</Td>
              <Td fontFamily="serif">{truncate(post.title)}</Td>
              <Td fontFamily="serif">{truncate(post.body)}</Td>
              <Td fontFamily="serif">{timeTag(post.createdAt)}</Td>
              <Td>
                <Box display="flex" alignItems="center">
                  <Button colorScheme="green" size="sm" mr="2">
                    <Link to={routes.post({ id: post.id })}>Show</Link>
                  </Button>
                  <Button colorScheme="blue" size="sm" mr="2">
                    <Link to={routes.editPost({ id: post.id })}>Edit</Link>
                  </Button>
                  {currentUser.roles === 'admin' && (
                    <Button
                      type="button"
                      title={'Delete post ' + post.id}
                      colorScheme="red"
                      size="sm"
                      onClick={() => onDeleteClick(post.id)}
                    >
                      Delete
                    </Button>
                  )}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Box>
        <Flex justify="center" mt={4}>
          <Stack direction="row" spacing={4}></Stack>
        </Flex>
      </Box>
    </>
  )
}

export default PostsList
