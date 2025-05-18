import "../styles/globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Script from "next/script";
import Head from "next/head"; // ✅ Add this for SEO & mobile scaling

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* ✅ SEO & Mobile Meta Tags */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>SpicyRate - OnlyFans & Creator Reviews</title>
        <meta
          name="description"
          content="Discover and rate top creators from OnlyFans, PH, and cam. Real reviews, spicy insights, and trending stars all in one place."
        />
        <meta name="theme-color" content="#ff1a1a" />

        {/* ✅ Full Favicon & Manifest Setup */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      {/* ✅ Google Analytics */}
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

      <Header />
      <main className="pt-4">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
