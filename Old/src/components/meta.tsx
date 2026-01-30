import Head from "next/head";

interface Meta{
    title: string;
}

export default function Meta({ title }: Meta) {
  return (
    <Head>
      <title>
        {title} | CUDSeeReg
      </title>
      <meta property="og:url" content="https://cudseereg.vercel.app/" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${title} | CUDSeeReg`} />
      <meta property="og:description" content="Easier way for CUD students to find your dream elective subjects" />
      {/* <meta property="og:image" content={image} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} | CUDSeeReg`} />
      <meta name="twitter:description" content="Easier way for CUD students to find your dream elective subjects" />
      <meta name="twitter:creator" content="@ronnapatp" />
    </Head>
  );
}