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
import { deleteSchoolTeacher, getSchoolTeachers } from "../../../api/teachers";
import CreateTeacherModal from "./components/CreateTeacherModal";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../routes";
import { DeleteTwoTone } from "@ant-design/icons";

function TeachersPage() {
  const queryClient = useQueryClient();
  const [isCreateTeacherModalOpen, setIsCreateTeacherModalOpen] =
    useState(false);

  const { data: teachers, isLoading } = useQuery(
    ["teachers"],
    getSchoolTeachers,
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const deleteSchoolTeacherMutation = useMutation(deleteSchoolTeacher, {
    onSuccess: () => {
      queryClient.invalidateQueries(["teachers"]);
      message.success("Teacher is deleted!");
    },
    onError: (err) => {
      message.error("Failed to delete teacher: " + err.response.data?.message);
    },
  });

  const handleDeleteSchoolTeacher = (teacherId) => {
    deleteSchoolTeacherMutation.mutate({
      teacherId,
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
            to={generatePath(routes.adminTeacherPage, { id: item.id })}
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
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (value, item) => {
        return (
          <div>
            <Tooltip title="Delete teacher">
              <DeleteTwoTone
                onClick={() => handleDeleteSchoolTeacher(item.id)}
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
          </div>
        );
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
      <Breadcrumb
        items={[
          {
            title: <Link to={routes.adminTeachersPage}>Teachers</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Teachers
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateTeacherModalOpen(true)}
        >
          Add teacher
        </Button>
      </div>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />
      <CreateTeacherModal
        isOpen={isCreateTeacherModalOpen}
        setIsCreateTeacherModalOpen={setIsCreateTeacherModalOpen}
      />
    </div>
  );
}

export default TeachersPage;
