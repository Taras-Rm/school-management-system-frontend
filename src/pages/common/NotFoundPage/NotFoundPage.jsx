import { Result } from "antd";
import React from "react";

function NotFoundPage() {
  return (
    <Result
      status={"404"}
      title={"404"}
      subTitle="Sorry, the page you visited does not exist."
    />
  );
}

export default NotFoundPage;
