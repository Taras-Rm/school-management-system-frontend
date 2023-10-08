import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Spin,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CreateStudentModal from "./components/CreateStudentModal";
import { deleteSchoolStudent, getSchoolStudents } from "../../../api/students";
import { routes } from "../../routes";
import { Link, generatePath } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";

function StudentsPage() {
  const queryClient = useQueryClient();
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState(false);

  const { data: students, isLoading } = useQuery(
    ["students"],
    getSchoolStudents,
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const deleteSchoolStudentMutation = useMutation(deleteSchoolStudent, {
    onSuccess: () => {
      queryClient.invalidateQueries(["students"]);
      message.success("Student is deleted!");
    },
    onError: (err) => {
      message.error("Failed to delete student: " + err.response.data?.message);
    },
  });

  const handleDeleteSchoolStudent = (studentId) => {
    deleteSchoolStudentMutation.mutate({
      studentId,
    });
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return (
          <Link
            to={generatePath(routes.adminStudentPage, { id: item.id })}
          >{`${value} ${item.surname}`}</Link>
        );
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
        return item.class
          ? `${item?.class?.level}-${item?.class?.section}`
          : "";
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (value, item) => {
        return (
          <div>
            <Tooltip title="Delete student">
              <DeleteTwoTone
                onClick={() => handleDeleteSchoolStudent(item.id)}
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </div>
        );
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
