import { Card, Grid, Text, useMantineTheme } from "@mantine/core";

import CountUp from "react-countup";
import React from "react";

type Props = {
  title: string;
  count: number;
};

const DataCount = (props: Props) => {
  const theme = useMantineTheme();
  return (
    <Grid.Col xs={12} md={6} lg={3}>
      <Card
        w="100%"
        withBorder
        shadow="sm"
        radius="md"
        style={{
          backgroundColor: theme.colors.dark[6],
          borderRadius: "15px",
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.8)",
          borderBottom: "3px solid #863",
        }}
      >
        <Card.Section withBorder inheritPadding py="xs">
          <Text color="dimmed">{props.title}</Text>
        </Card.Section>

        <Text mt="sm" size="sm">
          <CountUp end={props.count} />
        </Text>
      </Card>
    </Grid.Col>
  );
};

export default DataCount;
