export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const MAGIC_PUBLIC =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_live_B76AC84155B22763";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51K2YaiJtB9uSPJxeV479keXvpfuSW71Sqx7420OtIf7HsMdluV8yoVfgaw5iXcaEUhu8Prgrm5jIvVWMBm8Wddhh00k19Sodxk";

/**
 * Given an image return the URL
 * Works for local and deployed strapi
 * @param {any} image
 */

export const fromImageToUrl = (image) => {
  if (!image) {
    return "./vercel.svg";
  }
  if (image.url.indexOf("/") === 0) {
    return `${API_URL}${image.url}`;
  }
  return image.url;
};
