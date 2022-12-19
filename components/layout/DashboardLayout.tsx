import { AppShell, Burger, Header, MantineProvider, MediaQuery, Navbar, useMantineTheme, Text, NavLink, Avatar, Menu, Container } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { IconArrowsLeftRight, IconHome2, IconLogout, IconMessageCircle, IconPhoto, IconSearch, IconSettings, IconTrash } from '@tabler/icons';
import Router from "next/router";
import { signOut, useSession } from "next-auth/react";
import Loading from '../Loading';

type Props = {
  children: React.ReactNode
}

const DashboardLayout = (props: Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      Router.push("/auth/login");
    } else if (status === 'authenticated') {
      setReady(true);
    }
  }, [status])

  return !ready ? (
    <Loading>
      <Text>Loading</Text>
    </Loading>
  ) : (
    <MantineProvider
      theme={{
        // Override any other properties from default theme
        fontFamily: 'Chakra Petch, sans serif',
        spacing: { xs: 15, sm: 20, md: 25, lg: 30, xl: 40 },
      }}
    >
      <AppShell
        layout='alt'
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <NavLink label="Dashboard" icon={<IconHome2 size={16} stroke={1.5} />} />
            <NavLink label="User List" icon={<IconHome2 size={16} stroke={1.5} />} />
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <Container w="100%" style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div></div>
                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Avatar radius="xl" />
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Application</Menu.Label>
                    <Menu.Item icon={<IconSettings size={14} />}>Settings</Menu.Item>
                    <Menu.Item icon={<IconMessageCircle size={14} />}>Messages</Menu.Item>
                    <Menu.Item icon={<IconPhoto size={14} />}>Gallery</Menu.Item>
                    <Menu.Item
                      icon={<IconSearch size={14} />}
                      rightSection={<Text size="xs" color="dimmed">⌘K</Text>}
                    >
                      Search
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Label>Danger zone</Menu.Label>
                    <Menu.Item icon={<IconArrowsLeftRight size={14} />}>Transfer my data</Menu.Item>
                    <Menu.Item onClick={() => signOut()} color="red" icon={<IconLogout size={14} />}>Sign Out</Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Container>
            </div>
          </Header>
        }
      >
        {props.children}
      </AppShell>
    </MantineProvider >
  )
}

export default DashboardLayout;
