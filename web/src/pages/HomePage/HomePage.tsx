import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

const HomePage = () => {
  return (
    <>
      <Heading>Redwood Blogs</Heading>
      <Text noOfLines={1}>Welcome</Text>
      <Text>
        My default route is named <code>home</code>, link to me with `
        <Link to={routes.about()}>Home</Link>`
      </Text>
    </>
  )
}

export default HomePage
