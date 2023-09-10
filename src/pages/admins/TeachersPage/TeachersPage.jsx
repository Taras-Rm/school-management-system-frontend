import React from "react";
import { Spin, Table, Typography, message } from "antd";
import { useQuery } from "react-query";
import { getSchoolTeachers } from "../../../api/teachers";

function TeachersPage() {
  const {
    data: teachers,
    error,
    isLoading,
  } = useQuery(["teachers"], getSchoolTeachers, {
    onError: (error) => {
      message.error(error);
    },
  });

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return `${value} ${item.surname}`;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (value, item) => {
        return value;
      },
    },
  ];

  const tableData = teachers?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  if (isLoading) {
    return <Spin spinning />;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      <Typography.Title level={2}>Teachers</Typography.Title>
      <Table dataSource={tableData} columns={tableColumns} />
    </div>
  );
}

export default TeachersPage;
