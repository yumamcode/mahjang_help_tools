import * as React from 'react'

// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react'

export function Provider(props) {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      {props.children}
    </ChakraProvider>
  )
}