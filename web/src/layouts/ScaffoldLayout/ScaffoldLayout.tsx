import { Box, Flex, Heading, Button, Text } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  title,
  titleTo,
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {
  const { isAuthenticated, currentUser, logOut } = useAuth()

  return (
    <Box className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Box as="header" p={4} bg="purple.500" color="white">
        <Flex align="center" justify="space-between">
          <Box>
            <Heading as="h1" fontSize="xl">
              <Link to={routes.home()}>Redwood Blog</Link>
            </Heading>
            <Flex align="center">
              <Text fontSize="sm" mr={2}>
                {/* Logged in as {currentUser.email} */}
              </Text>
              <Button size="sm" onClick={logOut}>
                Logout
              </Button>
            </Flex>
          </Box>
          <Flex gap={2}>
            <Link to={routes.generatePost()}>
              <Button colorScheme="green">Generate Post Through AI</Button>
            </Link>
            <Link to={routes[buttonTo]()}>
              <Button colorScheme="green"> {buttonLabel} +</Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
      {/* <main className="rw-main">{children}</main> */}
      <Box
        as="main"
        className="rw-main"
        p={4}
        bg="gray.100"
        minH="100vh"
        boxShadow="md"
        borderRadius="md"
      >
        {children}
      </Box>
    </Box>
  )
}

export default ScaffoldLayout
