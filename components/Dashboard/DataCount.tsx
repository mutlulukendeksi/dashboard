import { Card, Grid, Text } from '@mantine/core'
import React from 'react'
import CountUp from 'react-countup';

type Props = {
  title: string;
  count: number;
}

const DataCount = (props: Props) => {
  return (
    <Grid.Col xs={12} md={6} lg={3}>
      <Card w="100%" withBorder shadow="sm" radius="md">
        <Card.Section withBorder inheritPadding py="xs">
          <Text color="dimmed">{props.title}</Text>
        </Card.Section>

        <Text mt="sm" size="sm">
          <CountUp end={props.count} />
        </Text>
      </Card>
    </Grid.Col>
  )
}

export default DataCount