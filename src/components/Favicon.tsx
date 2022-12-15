

const Favicon = (): JSX.Element => {
  return (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon.ico" />
      {/* <link rel="manifest" href="/favicon/site.webmanifest.json" /> */} {/* You can uncomment this to have PWA */}
      {/* <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" /> */}
      <meta name="msapplication-TileColor" content="#ffc40d" />
      <meta name="theme-color" content="#ffffff" />
    </>
  )
}

export default Favicon