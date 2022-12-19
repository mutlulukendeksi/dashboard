import { Button, Center, Container, Group, TextInput } from "@mantine/core";

import AuthLayout from "../../components/layout/AuthLayout";
import Link from "next/link";
import React from "react";
import { signIn } from "next-auth/react";
import { useForm } from "@mantine/form";

type Props = {};

const login = (props: Props) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Geçersiz e-posta"),
      password: (value) => (value.length >= 6 ? null : "Şifre çok kısa"),
    },
  });

  const handleSubmit = () => {
    console.log("form valueleri", form.values);
    signIn("credentials", {
      redirect: false,
      email: form.values.email,
      password: form.values.password,
    }).then((res) => {
      console.log("response değeri", res);
    });
  };

  return (
    <AuthLayout>
      <Center
        style={{
          width: "100vw",
          height: "100vh",
          flex: "flex",
          marginTop: "-180px",
          flexDirection: "column",
          boxShadow: "50px 50px 100px 0px rgba(0,0,0,0.75)",
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
            borderRadius: "35px",
            margin: "50px",
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              size="md"
              label=<p
                style={{
                  color: "white",
                  padding: "0",
                  margin: "0",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Email
              </p>
              placeholder="enter email"
              {...form.getInputProps("email")}
            />
            <TextInput
              size="md"
              mt={10}
              label=<p
                style={{
                  color: "white",
                  padding: "0",
                  margin: "0",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
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
