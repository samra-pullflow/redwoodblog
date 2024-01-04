import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  StackDivider,
} from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
const Article = ({ article }) => {
  return (
    <Box key={article.id} bg="purple.100" p={4} borderRadius="md" mb={4}>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />}>
            <Heading size="md">
              <Link to={routes.article({ id: article.id })}>
                Title: {article.title}
              </Link>
            </Heading>
            <Text>Description: {article.body}</Text>
            <Text>Created At: {article.createdAt}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Article
