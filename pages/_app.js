import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from "next/head";
import { useEffect, useState } from "react";
import Splash from "../components/Splash"; // ✅ Import splash

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec splash
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>CreatorPulse - Discover & Review Creators</title>
        <meta
          name="description"
          content="CreatorPulse is a React + Firebase project where users can discover, filter, and review digital creators. Built with Tailwind CSS."
        />
        <meta name="theme-color" content="#ff1a1a" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {loading ? (
        <Splash />
      ) : (
        <>
          <Header />
          <main className="pt-4">
            <Component {...pageProps} />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}

export default MyApp;
