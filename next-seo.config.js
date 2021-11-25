/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: "Yehez-Movie",
  titleTemplate: "%s | YehezGun",
  defaultTitle: "Yehez-Movie",
  description:
    "Search your favourite movie here.",
  canonical: "https://yehez-movie.yehezgun.com",
  openGraph: {
    url: "https://yehez-movie.yehezgun.com",
    title: "yehez-movie",
    description: "Search your favourite movie here.",
    type: "website",
    images: [
      {
        url: "https://yehez-og-image.yehezgun.com/Yehez%20Movie.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fres.cloudinary.com%2Fyehez%2Fimage%2Fupload%2Fv1636202181%2Fpeep_amkhuu.svg&widths=200&heights=200",
        alt: "yehez-nextchakra-starter.yehezgun.com og-image",
        width: 800,
        height: 600,
      },
    ],
    site_name: "yehez-movie",
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "https://assets.vercel.com/image/upload/v1607554385/repositories/next-js/next-logo.png",
    },
  ],
};

export default defaultSEOConfig;
