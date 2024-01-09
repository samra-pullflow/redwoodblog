import { Heading } from '@chakra-ui/react'
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
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

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
      <Heading>{article.title}</Heading>
      <Article article={article} doTruncate={false}></Article>
    </>
  )
}
