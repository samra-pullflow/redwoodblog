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
    }
  }
`

export const Loading = () => <Box>Loading...</Box>

export const Empty = () => <Box>Empty</Box>

export const Failure = ({
  error,
}: CellFailureProps<FindArticleQueryVariables>) => (
  <Box color="red">Error: {error?.message}</Box>
)

export const Success = ({
  article,
}: CellSuccessProps<FindArticleQuery, FindArticleQueryVariables>) => {
  return (
    <>
      <Article key={article.id} article={article}></Article>
    </>
  )
}
