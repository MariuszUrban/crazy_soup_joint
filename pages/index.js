import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { fromImageToUrl, API_URL } from "../utils/urls";
import { twoDecimals } from "../utils/format";

export default function Home({ products }) {
  return (
    <div>
      <Head>
        <title>The Soup Joint</title>
        <meta name="description" content="Generated by Mariusz Urban" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {products.map((product) => (
          <div key={product.name} className={styles.product}>
            <Link href={`/products/${product.slug}`}>
              <a>
                <div className={styles.product__Row}>
                  <img
                    src={fromImageToUrl(product.image)}
                    alt="image of a soup"
                  />

                  <div className={styles.product__Col}>
                    <h1> {product.name}</h1>
                    <h2>$ {twoDecimals(product.price)}</h2>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  //fetch the products
  const product_res = await fetch(`${API_URL}/products/`);
  const products = await product_res.json();
  //return the products as props
  return {
    props: { products },
  };
}
