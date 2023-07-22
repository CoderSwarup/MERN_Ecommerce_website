import React from "react";
import Helmet from "react-helmet";
export default function Metadata({ title, description }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}

Metadata.defaultProps = {
  title: "Sam Ecommerce",
  description: "Sam Ecommerce is Known as  best product on Our website ",
};
