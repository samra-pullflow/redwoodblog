import { Heading } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'

import { Link, routes } from '@redwoodjs/router'

const AboutPage = () => {
  return (
    <>
      <Heading>AboutPage</Heading>
      <Text>
        Find me in <code>./web/src/pages/AboutPage/AboutPage.tsx</code>
      </Text>
      <Text>
        My default route is named <code>about</code>, link to me with `
        <Link to={routes.home()}>About</Link>`
      </Text>
    </>
  )
}

export default AboutPage
