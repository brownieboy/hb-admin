import React from "react";
import { defaultThumbnailPath } from "../constants/general.js";

const ThumbNail = ({ thumbFullUrl, size = 50 }) => (
  <img
    src={thumbFullUrl || defaultThumbnailPath}
    style={{
      height: size,
      width: size,
      borderRadius: "50%",
      backgroundColor: "white",
      padding: thumbFullUrl ? 0 : 3,
      marginRight: 5
    }}
  />
);

export default ThumbNail;
