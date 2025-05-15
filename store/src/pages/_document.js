import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:title"
            content="Tharindu Pharmacy e-commerce Website"
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content="Tharindu Pharmacy e-commerce Website"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
