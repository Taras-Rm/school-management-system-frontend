import { Button, Spin, Typography } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { getAdminSchool } from "../../../api/school";
import { useQuery } from "react-query";

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
  const {
    data: school,
    isLoading,
    error,
  } = useQuery(["school"], getAdminSchool, {
    retry: false,
  });

  if (isLoading) {
    return <Spin spinning />;
  }

  return (
    <div style={{ width: "100%" }}>
      {school ? school.name : <WithoutSchoolBoard />}
    </div>
  );
}

export default SchoolPage;
