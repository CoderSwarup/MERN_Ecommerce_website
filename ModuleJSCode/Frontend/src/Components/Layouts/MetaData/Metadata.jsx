import React from "react";
import { Helmet } from "react-helmet";

export default function Metadata({ title, description }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* Meta tags for better SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="keywords" content="ecommerce, products, online shopping" />
      <meta name="Swarup" content="Sam Ecom" />
      {/* Open Graph Meta tags for social media sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* Replace the URL with your website's URL */}
      <meta property="og:url" content="https://wwwsamecom.com" />
      <meta property="og:type" content="website" />
      {/* Replace the URL with your website's image for social media sharing */}
      <meta
        property="og:image"
        content="https://www.example.com/og-image.jpg"
      />
      <meta property="og:image:alt" content="Alternate text for the image" />
    </Helmet>
  );
}

Metadata.defaultProps = {
  title: "Sam Ecommerce - Best Online Store for Products",
  description:
    "Discover the best products on Sam Ecommerce. Shop online for a wide range of products with fast shipping and excellent customer service.",
};
