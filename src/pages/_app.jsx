import LenisScroll from "@/components/common/LenisScroll";
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import "@/styles/fonts.css";

export default function App({ Component, pageProps }) {
  return (
    <LenisScroll>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LenisScroll>
  );
}
