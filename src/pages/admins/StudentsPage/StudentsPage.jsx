import React, { useState } from "react";
import { Button, Spin, Table, Typography, message } from "antd";
import { useQuery } from "react-query";
import CreateStudentModal from "./components/CreateStudentModal";
import { getSchoolStudents } from "../../../api/students";

function StudentsPage() {
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState(false);

  const {
    data: students,
    error,
    isLoading,
  } = useQuery(["students"], getSchoolStudents, {
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

  const tableData = students?.map((t) => {
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
      <Typography.Title level={2}>Students</Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateStudentModalOpen(true)}
        >
          Add student
        </Button>
      </div>
      <Table dataSource={tableData} columns={tableColumns} scroll={{y: 400}} pagination={false}/>
      <CreateStudentModal
        isOpen={isCreateStudentModalOpen}
        setIsCreateStudentModalOpen={setIsCreateStudentModalOpen}
      />
    </div>
  );
}

export default StudentsPage;
