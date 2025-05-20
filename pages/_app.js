import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
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
        <title>SpicyRate - OnlyFans & Creator Reviews</title>
        <meta
          name="description"
          content="Discover and rate top creators from OnlyFans, PH, and cam. Real reviews, spicy insights, and trending stars all in one place."
        />
        <meta name="theme-color" content="#ff1a1a" />
        <link rel="icon" type="image/png" href="/spicy-icon.png" />
      </Head>

      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-02GBS56X16"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-02GBS56X16');
          `,
        }}
      />

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
