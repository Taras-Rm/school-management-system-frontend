import React, { useState } from "react";
import { Button, Col, Row, Spin, Table, Typography, message } from "antd";
import { useQuery } from "react-query";
import { getSchoolClass, getSchoolClassStudents } from "../../../api/classes";
import { useParams } from "react-router";
import AssignClassForStudentsModal from "./components/AssignClassForStudentsModal";

function ClassPage() {
  const { id } = useParams();
  const [
    isAssignClassForStudentsModalOpen,
    setIsAssignClassForStudentsModalOpen,
  ] = useState(false);

  const {
    data: classData,
    error,
    isLoading,
  } = useQuery(["classes", id], () => getSchoolClass({ id }), {
    onError: (error) => {
      message.error(error);
    },
  });

  const {
    data: students,
    error: studentsError,
    isLoading: isLoadingStudents,
  } = useQuery(
    ["students", "class", id],
    () => getSchoolClassStudents({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

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

  if (isLoading || isLoadingStudents) return <Spin spinning />;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      <Typography.Title level={2}>{classData.name} class</Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsAssignClassForStudentsModalOpen(true)}
        >
          Assign students
        </Button>
      </div>

      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />

      <AssignClassForStudentsModal
        isOpen={isAssignClassForStudentsModalOpen}
        setIsAssignClassForStudentsModalOpen={
          setIsAssignClassForStudentsModalOpen
        }
        classId={id}
      />
    </div>
  );
}

export default ClassPage;
