import {
  AppShell,
  Avatar,
  Burger,
  Container,
  Header,
  List,
  MediaQuery,
  Menu,
  Modal,
  NavLink,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import {
  IconDeviceCameraPhone,
  IconHeart,
  IconHome2,
  IconLogout,
  IconSettings,
  IconUserCircle,
} from "@tabler/icons";
import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import Loading from "../Loading";
import Router from "next/router";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = (props: Props) => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [ready, setReady] = useState(false);
  const [openedModal, setOpenedModal] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      Router.push("/auth/login");
    } else if (status === "authenticated") {
      setReady(true);
    }
  }, [status]);

  return !ready ? (
    <Loading>
      <Text>Loading</Text>
    </Loading>
  ) : (
    <AppShell //TODO: hamburger menu not working
      layout="alt"
      styles={{
        main: {
          backgroundColor: theme.colors.gray[7],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "30px",
            backgroundColor: theme.colors.gray[8],
          }}
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
        >
          <NavLink
            component="a"
            href="/"
            label="Dashboard"
            icon={<IconHome2 size={24} stroke={2} />}
            style={{
              color: "pink",
              padding: "15px",
              borderRadius: "15px",
              textShadow: "0px 0px 10px rgba(255,255,255,0.5)",
              boxShadow: "0px 0px 10px rgba(255,255,255,0.7)",
              borderRight: "5px solid red",
              borderLeft: "5px solid red",
              borderTop: "1px solid pink",
              borderBottom: "1px solid gray",
            }}
            styles={{
              root: {
                transition: "all 0.5s ease",
                ":hover": {
                  opacity: 0.6,
                },
              },
            }}
          />
          <NavLink
            component="a"
            href="/user"
            label="User List"
            icon={<IconUserCircle size={24} stroke={2} />}
            style={{
              color: "pink",
              padding: "15px",
              borderRadius: "15px",
              textShadow: "0px 0px 10px rgba(255,255,255,0.5)",
              boxShadow: "0px 0px 10px rgba(255,255,255,0.7)",
              borderRight: "5px solid yellow",
              borderLeft: "5px solid yellow",
              borderTop: "1px solid orange",
              borderBottom: "1px solid pink",
            }}
            styles={{
              root: {
                transition: "all 0.5s ease",
                ":hover": {
                  opacity: 0.6,
                },
              },
            }}
          />
          <NavLink
            component="a"
            href="/device"
            label="Device List"
            icon={<IconDeviceCameraPhone size={24} stroke={2} />}
            style={{
              color: "pink",
              padding: "15px",
              borderRadius: "15px",
              textShadow: "0px 0px 10px rgba(255,255,255,0.5)",
              boxShadow: "0px 0px 10px rgba(255,255,255,0.7)",
              borderRight: "5px solid pink",
              borderLeft: "5px solid pink",
              borderTop: "1px solid gray",
              borderBottom: "1px solid white",
            }}
            styles={{
              root: {
                transition: "all 0.5s ease",
                ":hover": {
                  opacity: 0.6,
                },
              },
            }}
          />
          <NavLink
            component="a"
            href="/emotion"
            label="Emotion List"
            icon={<IconHeart size={24} stroke={2} />}
            style={{
              color: "pink",
              padding: "15px",
              borderRadius: "15px",
              textShadow: "0px 0px 10px rgba(255,255,255,0.5)",
              boxShadow: "0px 0px 10px rgba(255,255,255,0.7)",
              borderRight: "5px solid purple",
              borderLeft: "5px solid purple",
              borderTop: "1px solid gray",
              borderBottom: "1px solid pink",
            }}
            styles={{
              root: {
                transition: "all 0.5s ease",
                ":hover": {
                  opacity: 0.6,
                },
              },
            }}
          />
        </Navbar>
      }
      header={
        <Header
          height={{ base: 50, md: 70 }}
          p="md"
          style={{ backgroundColor: theme.colors.gray[8] }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Container
              fluid
              w="100%"
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div></div>
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Avatar radius="xl" style={{ cursor: "pointer" }} />
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => setOpenedModal(true)}
                    icon={<IconSettings size={14} />}
                  >
                    <Text>Settings</Text>
                  </Menu.Item>

                  <Menu.Divider />
                  <Menu.Item
                    onClick={() => signOut()}
                    color="red"
                    icon={<IconLogout size={14} />}
                  >
                    Sign Out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Container>
          </div>
        </Header>
      }
    >
      <Modal
        opened={openedModal}
        onClose={() => setOpenedModal(false)}
        title="Ayarlar"
        overlayColor="black"
        centered
        overlayOpacity={0.55}
        overlayBlur={3}
      >
        <List>
          <List.Item>Clone or download repository from GitHub</List.Item>
          <List.Item>Install dependencies with yarn</List.Item>
          <List.Item>
            To start development server run npm start command
          </List.Item>
          <List.Item>
            Run tests to make sure your changes do not break the build
          </List.Item>
          <List.Item>Submit a pull request once you are done</List.Item>
        </List>
      </Modal>
      {props.children}
    </AppShell>
  );
};

export default DashboardLayout;
