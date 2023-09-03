import { Button, Typography } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

function WithoutSchoolBoard() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <Typography.Title level={2} style={{ marginBottom: 30 }}>
        If you want to use a system, first of all you should create a school
      </Typography.Title>
      <Button size="large" type="primary" style={{ backgroundColor: "green" }}>
        Create a school <PlusCircleOutlined />
      </Button>
    </div>
  );
}

function SchoolPage() {
  const [isSchool, setIsSchool] = useState(true);

  return (
    <div style={{ width: "100%" }}>
      {isSchool ? "SchoolPage" : <WithoutSchoolBoard />}
    </div>
  );
}

export default SchoolPage;
