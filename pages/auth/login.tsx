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
import router from "next/router";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";

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

  const { data: session, status } = useSession();
  console.log("SessionData", session);
  console.log("StatusData", status);

  const handleSubmit = async () => {
    try{
      const res = await signIn("credentials", {
        redirect: false,
        email: form.values.email,
        password: form.values.password,
        callbackUrl: `${window.location.origin}`,
      })
      console.log(res);
      if(res.error) throw res;

      toast.success("Giriş Başarılı");

      if (res.url) router.push(res.url);
    }catch(err){
      console.log(err);
      if(err.error=="CredentialsSignin") toast.error("Geçersiz şifre..");
      else if(err.error=="No user found") toast.error("Kullanıcı bulunamadı..");
      else toast.error(err.error);
    }

  };

  return (
    <AuthLayout>
      <Center
        style={{
          width: "100vw",
          height: "100vh",
          flex: "flex",
          marginTop: "-140px",
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
              type="password"
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
              <Link href="/auth/register">
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
                  Register
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
