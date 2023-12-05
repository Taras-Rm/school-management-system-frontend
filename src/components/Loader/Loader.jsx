import { Spin } from "antd";
import React from "react";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size="large" spinning />
    </div>
  );
}

export default Loader;
