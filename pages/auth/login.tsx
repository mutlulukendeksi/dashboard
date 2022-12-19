import { Button, Center, Container, Group, TextInput } from "@mantine/core";

import AuthLayout from "../../components/layout/AuthLayout";
import Link from "next/link";
import React from "react";
import Thirteen from "../../public/next.svg";
import { useForm } from "@mantine/form";

type Props = {};

const login = (props: Props) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <AuthLayout>
      <Center
        style={{
          width: "100vw",
          height: "100vh",
          flex: "flex",
          marginTop: "-180px",
          flexDirection: "column",
        }}
      >
        <h1
          style={{
            fontSize: "100px",
            color: "white",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Mutluluk Endeksi
        </h1>
        <Container
          w="400px"
          mt={50}
          style={{
            backgroundImage: `linear-gradient(rgba(57,35,100,.4), rgba(33,40,39,.8))`,
            height: "max-content",
            padding: "20px",
            borderRadius: "50px",
          }}
        >
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              size="md"
              label=<p style={{ color: "white", padding: "0", margin: "0" }}>
                Email
              </p>
              placeholder="enter email"
              {...form.getInputProps("email")}
            />
            <TextInput
              size="md"
              mt={10}
              label=<p style={{ color: "white", padding: "0", margin: "0" }}>
                Password
              </p>
              placeholder="enter password"
              {...form.getInputProps("password")}
            />

            <Group
              position="center"
              mt={40}
              style={{ display: "flex", justifyContent: "space-arround" }}
            >
              <Button type="submit">Submit</Button>
              <Link href="/auth/register">
                <Button>Register</Button>
              </Link>
            </Group>
          </form>
        </Container>
      </Center>
    </AuthLayout>
  );
};

export default login;
