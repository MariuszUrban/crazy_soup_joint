export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const MAGIC_PUBLIC =
  process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || "pk_live_B76AC84155B22763";

export const STRIPE_PK =
  process.env.NEXT_PUBLIC_STRIPE_PK ||
  "pk_test_51K2YaiJtB9uSPJxeV479keXvpfuSW71Sqx7420OtIf7HsMdluV8yoVfgaw5iXcaEUhu8Prgrm5jIvVWMBm8Wddhh00k19Sodxk";

/**
 * Given a image object return the proper path to display it
 * Provides a default as well
 * @param {any} image
 */
export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg"; //Or default image here
  }
  if (image.url.indexOf("/") === 0) {
    //It's a relative url, add API URL
    return `${API_URL}${image.url}`;
  }

  return image.url;
};
