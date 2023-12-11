import { Player } from '@lottiefiles/react-lottie-player';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Layout({ children }: any) {
  const router = useRouter();
  const { user = '' } = router.query;

  return (
    <>
      <Head>
        <title>Open Source Wrapped - By Schrodinger Hat'</title>
        <meta name='Description' content='Wrap your Github open source profile for the end of the year' />
        <link rel="icon" type="image/png" href="/sh.png" /> 
        <meta property="og:url" content="https://wrapped.schrodinger-hat.it" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Github Wrapped 2023 - By Schrodinger Hat"
        />
        <meta
          property="og:description"
          content="Github Wrapped 2023 - By Schrodinger Hat is the wrapped of the year for your open source contributions"
        />
        <meta
          property="og:image"
          content={`https://wrapped.schrodinger-hat.it/.netlify/functions/generator?username=${user}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="wrapped.schrodinger-hat.it" />
        <meta
          property="twitter:url"
          content="https://wrapped.schrodinger-hat.it"
        />
        <meta
          name="twitter:title"
          content="Github Wrapped 2023 - By Schrodinger Hat"
        />
        <meta
          name="twitter:description"
          content="Github Wrapped 2023 - By Schrodinger Hat is the wrapped of the year for your open source contributions"
        />
        <meta
          name="twitter:image"
          content={`https://wrapped.schrodinger-hat.it/.netlify/functions/generator?username=${user}`}
        />
      </Head>
      <main>
        <Player
          src="https://lottie.host/2190284c-daed-48a4-b07b-fff6c242e854/0yoXLzjEtd.json"
          background="transparent"
          speed={0.1}
          style={{
            position: 'absolute',
            width: '100%',
            height: 'auto',
            top: 0,
            left: 0,
            zIndex: -1,
          }} loop autoplay />
        {children}
      </main>
    </>
  );
}
