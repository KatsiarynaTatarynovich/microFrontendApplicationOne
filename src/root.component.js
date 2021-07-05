import React from "react";

export default function Root(props) {
  const src = props
    .getCommonImages()
    .find((img) => img.name === "Norway").image;
  console.log("props", props);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Application one {props.name}</h2>
      <h3>Date : {new Date().toLocaleTimeString()}</h3>
      <img src={src} style={{ maxHeight: "300px" }} alt="Norway" />
    </div>
  );
}
