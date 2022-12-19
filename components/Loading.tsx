import { Center } from '@mantine/core'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const Loading = (props: Props) => {
  return (
    <Center style={{ width: '100vw', height: '100vh' }}>
      {props.children}
    </Center>
  )
}

export default Loading