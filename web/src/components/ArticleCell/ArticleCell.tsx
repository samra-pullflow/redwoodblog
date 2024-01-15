import { Box } from '@chakra-ui/react'
import type { FindArticleQuery, FindArticleQueryVariables } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from '../Article/Article'

export const QUERY = gql`
  query FindArticleQuery($id: Int!) {
    article: postService(id: $id) {
      id
      title
      body
      createdAt
      user {
        name
        email
      }
    }
  }
`

export const Loading = () => <Box>Loading...</Box>

export const Empty = () => <Box>Empty</Box>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  article,
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return (
    <>
      <Article article={article} doTruncate={false}></Article>
    </>
  )
}
