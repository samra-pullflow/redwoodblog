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
import { Toaster } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'
type LayoutProps = {
  title: string
  titleTo: string
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({ children }: LayoutProps) => {
  const { logOut } = useAuth()

  return (
    <Box className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Box as="header" p={4} bg="purple.500" color="white">
        <Flex align="center" justify="space-between">
          <Box>
            <Heading as="h1" fontSize="xl">
              <Link to={routes.home()}>Redwood Blog</Link>
            </Heading>
          </Box>
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
                <Link to={routes.newPost()}>
                  <MenuItem icon={<ExternalLinkIcon />} color="green">
                    New Post
                  </MenuItem>
                </Link>
                <MenuItem onClick={logOut} icon={<RepeatIcon />} color="green">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
      <Box
        as="main"
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
