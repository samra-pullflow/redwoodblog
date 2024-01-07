import {
  Box,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  StackDivider,
} from '@chakra-ui/react'
import moment from 'moment'

import { Link, routes } from '@redwoodjs/router'

import { truncate } from 'src/lib/formatters'
const Article = ({ article }) => {
  const formattedDate = moment(article.createdAt).format(
    'MMMM Do YYYY, h:mm:ss a'
  )
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
            <Text>Description: {truncate(article.body)}</Text>
            <Text>Created At: {formattedDate}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Article
