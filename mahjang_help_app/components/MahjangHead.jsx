import Head from "next/head";

const Seo = ({ pageTitle, pageDescription }) => {
  const title = pageTitle;
  const description = pageDescription;

  return (
    <Head>
      <title>{title}</title>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0"
      ></meta>
      <meta name="description" content={description}></meta>
    </Head>
  );
};

export { Seo };
