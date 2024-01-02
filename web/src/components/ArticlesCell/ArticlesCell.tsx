import {
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  StackDivider,
  Box,
} from '@chakra-ui/react'
import type { ArticlesQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query ArticlesQuery {
    articles: posts {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ articles }: CellSuccessProps<ArticlesQuery>) => {
  return articles.map((article) => (
    <Box key={article.id}>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />}>
            <Heading size="md">Title: {article.title}</Heading>
            <Text>Description: {article.body}</Text>
            <Text>Created At: {article.createdAt}</Text>
          </Stack>
        </CardBody>
        {/* <CardFooter>{article.createdAt}</CardFooter> */}
      </Card>
    </Box>
  ))
}
