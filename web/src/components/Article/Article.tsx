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
const Article = ({ article, doTruncate }) => {
  const formattedDate = moment(article.createdAt).format(
    'MMMM Do YYYY, h:mm:ss a'
  )
  return (
    <Box bg="purple.100" p={4} borderRadius="md" mb={4}>
      <Card>
        <CardBody>
          <Stack divider={<StackDivider />}>
            <Heading size="md">
              <Link to={routes.article({ id: article.id })}>
                Title: {article.title}
              </Link>
              <Text>by {article.user.email}</Text>
            </Heading>
            <Text>
              Description: {doTruncate ? truncate(article.body) : article.body}
            </Text>
            <Text>Created At: {formattedDate}</Text>
          </Stack>
        </CardBody>
      </Card>
    </Box>
  )
}

export default Article
