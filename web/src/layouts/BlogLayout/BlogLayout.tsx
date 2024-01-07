import { Box, Flex, Heading, Text, Button, Stack } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

import { useAuth } from 'src/auth'

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()
  return (
    <>
      <Box as="header" p={4} bg="purple.500" color="white">
        <Flex align="center" justify="space-between">
          <Box>
            <Heading as="h1" fontSize="xl">
              <Link to={routes.home()}>Redwood Blog</Link>
            </Heading>
            {isAuthenticated ? (
              <Flex align="center">
                <Text fontSize="sm" mr={2}>
                  Logged in as {currentUser.email}
                </Text>
                <Button size="sm" onClick={logOut}>
                  Logout
                </Button>
              </Flex>
            ) : (
              <Link to={routes.login()}>Login</Link>
            )}
          </Box>
          <Stack direction="row" spacing={4}>
            <Flex as="ul" listStyleType="none" ml={4} fontSize="sm">
              <li>
                <Link to={routes.home()}>Home </Link>
              </li>
              <li>
                <Link to={routes.about()}>About </Link>
              </li>
              <li>
                <Link to={routes.contact()}>Contact </Link>
              </li>
            </Flex>
          </Stack>
        </Flex>
      </Box>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
