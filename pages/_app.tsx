import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Title } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import { useEffect } from "react";
import Link from "next/link";
import "devextreme/dist/css/dx.light.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const queryClient = new QueryClient();

  useEffect(() => {
    dayjs.locale("fr");
  }, []);

  return (
    <>
      <Head>
        <title>FFS timing session</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <div>
            <Title style={{ marginBottom: "50px", textAlign: "center" }}>
              <Link href={"/"}>FFS timing session</Link>
            </Title>
            <Component {...pageProps} />
          </div>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}
