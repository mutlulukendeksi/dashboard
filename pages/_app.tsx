import { SessionProvider } from "next-auth/react";
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MantineProvider
        theme={{
          // Override any other properties from default theme
          fontFamily: "Chakra Petch, sans serif",
          colorScheme: "dark",
        }}
        withNormalizeCSS
      >
        <Component {...pageProps} />
      </MantineProvider>
    </SessionProvider>
  )
}
