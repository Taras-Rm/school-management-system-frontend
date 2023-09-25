import React, { useState } from "react";
import { Button, Spin, Table, Typography, message } from "antd";
import { useQuery } from "react-query";
import { getSchoolTeachers } from "../../../api/teachers";
import CreateTeacherModal from "./components/CreateTeacherModal";

function TeachersPage() {
  const [isCreateTeacherModalOpen, setIsCreateTeacherModalOpen] =
    useState(false);

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
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateTeacherModalOpen(true)}
        >
          Add teacher
        </Button>
      </div>
      <Table dataSource={tableData} columns={tableColumns} scroll={{y: 400}} pagination={false}/>
      <CreateTeacherModal
        isOpen={isCreateTeacherModalOpen}
        setIsCreateTeacherModalOpen={setIsCreateTeacherModalOpen}
      />
    </div>
  );
}

export default TeachersPage;
