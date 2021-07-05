import React from "react";

export default function Root(props) {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Application one {props.name}</h2>
      <h3>Date : {new Date().toLocaleTimeString()}</h3>
    </div>
  );
}
