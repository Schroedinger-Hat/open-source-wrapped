import Head from 'next/head';

export default function Layout({ children }: any) {
  return (
    <>
      <Head>
        <meta property="og:url" content="https://wrapped.schrodinger-hat.it" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Github Wrapped 2022 - By Schrodinger Hat"
        />
        <meta
          property="og:description"
          content="Github Wrapped 2022 - By Schrodinger Hat is the wrapped of the year for your open source contributions"
        />
        <meta
          property="og:image"
          content="https://wrapped.schrodinger-hat.it/.netlify/functions/generator"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="wrapped.schrodinger-hat.it" />
        <meta
          property="twitter:url"
          content="https://wrapped.schrodinger-hat.it"
        />
        <meta
          name="twitter:title"
          content="Github Wrapped 2022 - By Schrodinger Hat"
        />
        <meta
          name="twitter:description"
          content="Github Wrapped 2022 - By Schrodinger Hat is the wrapped of the year for your open source contributions"
        />
        <meta
          name="twitter:image"
          content="https://wrapped.schrodinger-hat.it/.netlify/functions/generator"
        />
      </Head>
      <main>{children}</main>
    </>
  );
}
