import { useSession } from 'next-auth/react';
import Router from 'next/router';
import React, { useCallback, useEffect, useState } from 'react'
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Text } from "@mantine/core";

import AuthBackgroundImage from '../../public/images/authBackgroud.jpg';
import Loading from '../Loading';

type Props = {
  children: React.ReactNode
}

const AuthLayout = (props: Props) => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
    console.log(container);
  }, []);

  const [ready, setReady] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      Router.push("/");
      setReady(false);
    } else if (status == 'unauthenticated') {
      setReady(true)
    } else {
      setReady(false)
    }
  }, [status])

  return !ready ? (
    <Loading>
      <Text>Loading</Text>
    </Loading>
  ) : (
    <div>
      <div style={{ zIndex: -999 }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              image: `linear-gradient(rgba(44,83,100,.3), rgba(15,32,39,.6)), url(${AuthBackgroundImage.src})`,
              color: {
                value: 'transparent',
              },
              position: '50% 50%',
              repeat: 'no-repeat',
              size: 'cover',
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: false,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 200,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              collisions: {
                enable: true,
              },
              move: {
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 2,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 30,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>
      <div style={{ zIndex: 999 }}>
        {props.children}
      </div>
    </div>
  )
}

export default AuthLayout;
