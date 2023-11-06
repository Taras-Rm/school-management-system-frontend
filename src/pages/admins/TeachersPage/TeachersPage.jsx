import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Popconfirm,
  Spin,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteSchoolTeacher, getSchoolTeachers } from "../../../api/teachers";
import CreateTeacherModal from "./components/CreateTeacherModal";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import TeacherInfoDrawer from "../../../components/TeacherInfoDrawer/TeacherInfoDrawer";
import EditTeacherDrawer from "../../../components/EditTeacherDrawer/EditTeacherDrawer";

function TeachersPage() {
  const queryClient = useQueryClient();
  const [isCreateTeacherModalOpen, setIsCreateTeacherModalOpen] =
    useState(false);

  const [teacherInfoId, setTeacherInfoId] = useState(null);
  const [editTeacherId, setEditTeacherId] = useState(null);

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
            onClick={() => setTeacherInfoId(item.id)}
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
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Tooltip title="Edit teacher">
              <EditTwoTone
                onClick={() => setEditTeacherId(item.id)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Tooltip title="Delete teacher">
              <Popconfirm
                title="Do you really want to delete teacher ?"
                onConfirm={() => handleDeleteSchoolTeacher(item.id)}
              >
                <DeleteTwoTone
                  twoToneColor="#eb2f96"
                  style={{ cursor: "pointer" }}
                />
              </Popconfirm>
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
        position: "relative",
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
      <TeacherInfoDrawer
        isOpen={!!teacherInfoId}
        teacher={teachers.find((t) => t.id === teacherInfoId)}
        onClose={() => setTeacherInfoId(null)}
      />
      <EditTeacherDrawer
        isOpen={!!editTeacherId}
        id={editTeacherId}
        onClose={() => setEditTeacherId(null)}
      />
    </div>
  );
}

export default TeachersPage;
