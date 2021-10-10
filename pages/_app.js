import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>EcoleDirecte - Notes</title>
        <meta name="author" content="Martin Saldinger" />
        <meta name="description" content="Made by Martin Saldinger" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
