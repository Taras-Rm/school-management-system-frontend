import React, { useState } from "react";
import { Breadcrumb, Button, Spin, Table, Typography, message } from "antd";
import { useQuery } from "react-query";
import CreateStudentModal from "./components/CreateStudentModal";
import { getSchoolStudents } from "../../../api/students";
import { routes } from "../../routes";
import { Link } from "react-router-dom";

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
    {
      title: "Class",
      dataIndex: "Class",
      key: "class.name",
      render: (value, item) => {
        return item.class?.name;
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
      <Breadcrumb
        items={[
          {
            title: <Link to={routes.adminStudentsPage}>Students</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Students
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateStudentModalOpen(true)}
        >
          Add student
        </Button>
      </div>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />
      <CreateStudentModal
        isOpen={isCreateStudentModalOpen}
        setIsCreateStudentModalOpen={setIsCreateStudentModalOpen}
      />
    </div>
  );
}

export default StudentsPage;
