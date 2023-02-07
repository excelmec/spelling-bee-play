import React from "react";
import { Helmet } from "react-helmet";

function CustomTitle({ title }) {
  return (
    <Helmet>
      <title>Excel Play | Spelling Bee | {title}</title>
    </Helmet>
  );
}

export default CustomTitle;
