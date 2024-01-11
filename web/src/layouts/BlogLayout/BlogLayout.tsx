import { AddIcon, ExternalLinkIcon, RepeatIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  IconButton,
  MenuList,
} from '@chakra-ui/react'
import { FaRegUserCircle } from 'react-icons/fa'

import { Link, routes } from '@redwoodjs/router'

type BlogLayoutProps = {
  children?: React.ReactNode
}

import { useAuth } from 'src/auth'

const BlogLayout = ({ children }: BlogLayoutProps) => {
  const { isAuthenticated, logOut } = useAuth()
  return (
    <>
      <Box as="header" p={4} bg="purple.500" color="white">
        <Flex align="center" justify="space-between">
          <Box>
            <Heading as="h1" fontSize="xl">
              <Link to={routes.home()}>Redwood Blog</Link>
            </Heading>
          </Box>
          {isAuthenticated ? (
            <Flex gap={2}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FaRegUserCircle />}
                  variant="outline"
                />
                <MenuList>
                  <Link to={routes.generatePost()}>
                    <MenuItem icon={<AddIcon />} color="green">
                      Generate Post
                    </MenuItem>
                  </Link>
                  <Link to={routes.posts()}>
                    <MenuItem icon={<ExternalLinkIcon />} color="green">
                      Posts
                    </MenuItem>
                  </Link>
                  <Link to={routes.newPost()}>
                    <MenuItem icon={<ExternalLinkIcon />} color="green">
                      New Post
                    </MenuItem>
                  </Link>
                  <MenuItem
                    onClick={logOut}
                    icon={<RepeatIcon />}
                    color="green"
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <Link to={routes.login()}>Login</Link>
          )}
        </Flex>
      </Box>
      <main>{children}</main>
    </>
  )
}

export default BlogLayout
