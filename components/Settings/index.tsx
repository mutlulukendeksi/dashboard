import { IconBell, IconDatabase, IconKey, IconUserCircle } from "@tabler/icons";
import { List, Tabs } from "@mantine/core";
import React, { useState } from "react";

import Database from "./Database";
import Notification from "./Notification";
import Profile from "./Profile";
import Security from "./Security";

type Props = {};

const Settings = (props: Props) => {
  const [activeTab, setActiveTab] = useState<string | null>("profile");

  return (
    <>
      <Tabs
        value={activeTab}
        onTabChange={setActiveTab}
        radius="lg"
        color="yellow"
      >
        <Tabs.List position="apart" grow>
          <Tabs.Tab value="profile" icon={<IconUserCircle size={14} />}>
            Profile
          </Tabs.Tab>
          <Tabs.Tab value="security" icon={<IconKey size={14} />}>
            Security
          </Tabs.Tab>
          <Tabs.Tab value="database" icon={<IconDatabase size={14} />}>
            Database settings
          </Tabs.Tab>
          <Tabs.Tab value="notification" icon={<IconBell size={14} />}>
            Notification
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="profile" pt="xs">
          <Profile />
        </Tabs.Panel>

        <Tabs.Panel value="security" pt="xs">
          <Security />
        </Tabs.Panel>

        <Tabs.Panel value="database" pt="xs">
          <Database />
        </Tabs.Panel>

        <Tabs.Panel value="notification" pt="xs">
          <Notification />
        </Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Settings;
