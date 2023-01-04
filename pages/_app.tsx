import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css';

import type { AppProps } from 'next/app'
import { MantineProvider } from "@mantine/core";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </MantineProvider>
    </SessionProvider>
  )
}
