import {
  Button,
  Center,
  Container,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import {
  ImAppleinc,
  ImFacebook2,
  ImGithub,
  ImGoogle2,
  ImLinkedin,
  ImTwitch,
  ImTwitter,
} from "react-icons/im";

import AuthLayout from "../../components/layout/AuthLayout";
import Link from "next/link";
import React from "react";
import { SiDiscord } from "react-icons/si";
import { signIn } from "next-auth/react";
import { useForm } from "@mantine/form";

type Props = {};

const login = (props: Props) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      password2: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Geçersiz e-posta"),
      password: (value) => (value.length >= 6 ? null : "Şifre çok kısa"),
      password2: (value) => (value.length >= 6 ? null : "Şifre çok kısa"),
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
          marginTop: "-100px",
          flexDirection: "column",
          boxShadow: "50px 50px 100px 0px rgba(0,0,0,0.75)",
        }}
      >
        <Text
          fz={{ md: "70px", lg: "100px", sm: "50px" }}
          style={{
            color: "white",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          Mutluluk Endeksi
        </Text>
        <Container
          w="400px"
          style={{
            backgroundImage: `linear-gradient(rgba(57,35,100,.4), rgba(33,40,39,.8))`,
            height: "max-content",
            padding: "20px",
            borderRadius: "35px",
            margin: "20px",
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              size="md"
              styles={{
                input: {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "pink",
                  fontSize: "18px",
                  borderRadius: "15px",
                  transition: "all 0.5s ease",
                  "::placeholder": {
                    color: "orange",
                    opacity: ".8",
                  },
                  ":-webkit-autofill,:-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active":
                    {
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  ":hover , :focus": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                    "::placeholder": {
                      opacity: "1",
                    },
                  },
                },
              }}
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
              styles={{
                input: {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "pink",
                  fontSize: "18px",
                  borderRadius: "15px",
                  transition: "all 0.5s ease",
                  "::placeholder": {
                    color: "orange",
                    opacity: ".8",
                  },
                  ":-webkit-autofill,:-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active":
                    {
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  ":hover , :focus": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                    "::placeholder": {
                      opacity: "1",
                    },
                  },
                },
              }}
              mt={10}
              type="password"
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
            <TextInput
              size="md"
              styles={{
                input: {
                  backgroundColor: "rgba(255,255,255,0.1)",
                  color: "pink",
                  fontSize: "18px",
                  borderRadius: "15px",
                  transition: "all 0.5s ease",
                  "::placeholder": {
                    color: "orange",
                    opacity: ".8",
                  },
                  ":-webkit-autofill,:-webkit-autofill:hover, :-webkit-autofill:focus, :-webkit-autofill:active":
                    {
                      transition: "background-color 5000s ease-in-out 0s",
                    },
                  ":hover , :focus": {
                    backgroundColor: "rgba(255,255,255,0.3)",
                    "::placeholder": {
                      opacity: "1",
                    },
                  },
                },
              }}
              mt={10}
              type="password"
              label=<p
                style={{
                  color: "white",
                  padding: "0",
                  margin: "0",
                  pointerEvents: "none",
                  userSelect: "none",
                }}
              >
                Password again
              </p>
              placeholder="enter password again"
              {...form.getInputProps("password2")}
            />

            <Group
              position="center"
              mt={40}
              style={{ display: "flex", justifyContent: "space-arround" }}
            >
              <Button
                styles={{
                  root: {
                    backgroundColor: "#ADA2FF",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    letterSpacing: "2px",
                    color: "blue",
                    transition: "all 0.5s ease",
                    ":hover": {
                      backgroundColor: "#C0DEFF",
                      color: "blueviolet",
                    },
                  },
                }}
                type="submit"
              >
                Submit
              </Button>
              <Link href="/auth/login">
                <Button
                  styles={{
                    root: {
                      backgroundColor: "#439A97",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                      color: "orange",
                      transition: "all 0.5s ease",
                      ":hover": {
                        backgroundColor: "#62B6B7",
                        color: "yellow",
                      },
                    },
                  }}
                >
                  Login
                </Button>
              </Link>
            </Group>
            <Center style={{ fontSize: "20px", width: "max-contetnt" }}>
              <hr style={{ width: "50%" }} />
              <p
                style={{
                  marginLeft: "25px",
                  marginRight: "25px",
                  color: "white",
                }}
              >
                yada
              </p>
              <hr style={{ width: "50%" }} />
            </Center>
            <Center
              style={{
                gap: "25px",
                display: "flex",
                flexFlow: "row wrap",
              }}
            >
              <Button
                style={{
                  backgroundColor: "transparent",
                  fontSize: "30px",
                }}
                onClick={() => signIn("facebook")}
              >
                <ImFacebook2 />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("github")}
              >
                <ImGithub />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("google")}
              >
                <ImGoogle2 />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("linkedin")}
              >
                <ImLinkedin />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("twitter")}
              >
                <ImTwitter />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("twitch")}
              >
                <ImTwitch />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("discord")}
              >
                <SiDiscord />
              </Button>
              <Button
                style={{ backgroundColor: "transparent", fontSize: "30px" }}
                onClick={() => signIn("apple")}
              >
                <ImAppleinc />
              </Button>
            </Center>
          </form>
        </Container>
      </Center>
    </AuthLayout>
  );
};

export default login;
