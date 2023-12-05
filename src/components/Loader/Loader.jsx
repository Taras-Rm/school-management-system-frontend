import { Spin } from "antd";
import React from "react";

function Loader({size = "large"}) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spin size={size} spinning />
    </div>
  );
}

export default Loader;
