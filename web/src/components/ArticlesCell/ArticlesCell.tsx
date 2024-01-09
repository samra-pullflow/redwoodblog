import { Box } from '@chakra-ui/react'
import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Article from '../Article/Article'

export const QUERY = gql`
  query ArticlesQuery {
    articles: postsService {
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

export const Loading = () => <Box>Loading...</Box>

export const Empty = () => <Box>Empty</Box>

export const Failure = ({ error }: CellFailureProps) => (
  console.log('cant fetch data'),
  (<Box color="red">Error: {error?.message}</Box>)
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return articles.map((article) => (
    <Article key={article.id} article={article}></Article>
  ))
}
