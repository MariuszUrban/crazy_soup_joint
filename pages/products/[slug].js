import Head from "next/head";
import Image from "next/image";
import { fromImageToUrl, API_URL } from "../../utils/urls";
import { twoDecimals } from "../../utils/format";
import { BuyButton } from "../../components/BuyButton";

const Product = ({ product }) => {
  return (
    <div>
      <Head>
        {product.meta_title && <title>{product.meta_title}</title>}
        {product.meta_description && (
          <meta name="description" content={product.meta_description} />
        )}
      </Head>
      <h3>{product.name}</h3>
      <Image intrinsic width={300} src={product.image} alt="image product" />
      <h3>{product.name}</h3>
      <p>
        ${twoDecimals(product.price)} <BuyButton product={product} />
      </p>
      <p>{product.content}</p>
    </div>
  );
};

export async function getStaticProps({ params: { slug } }) {
  const product_res = await fetch(`${API_URL}/products/?slug=${slug}`);
  const found = await product_res.json();

  return {
    props: {
      product: found[0], // Because the API response for filters is an array
    },
  };
}

export async function getStaticPaths() {
  //retrieve all the possible paths
  const products_res = await fetch(`${API_URL}/products/`);
  const products = await products_res.json();

  //return them to NextJS context
  return {
    paths: products.map((product) => ({
      params: {
        slug: String(product.slug),
      },
    })),
    fallback: false, // tells to NextJS to show a 404 if the param is not matched
  };
}

export default Product;
