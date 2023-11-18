import React, { useContext, useMemo, useState } from "react";
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
import { deleteSchoolTeacher, getSchoolTeachers } from "../../api/teachers";
import CreateTeacherModal from "./components/CreateTeacherModal";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import TeacherInfoDrawer from "../../components/TeacherInfoDrawer/TeacherInfoDrawer";
import EditTeacherDrawer from "../../components/EditTeacherDrawer/EditTeacherDrawer";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";

function TeachersPage() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

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
      message.success(t('pages.teachers.table.msgDeleted'));
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

  const getTableColumns = useMemo(() => {
    let columns = [
      {
        title: t("tables.name"),
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
        title: t("tables.email"),
        dataIndex: "email",
        key: "email",
        render: (value, item) => {
          return value;
        },
      },
    ];
    if (user.role === "admin") {
      columns.push({
        title: t("tables.action"),
        dataIndex: "action",
        key: "action",
        align: "center",
        render: (value, item) => {
          return (
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <Tooltip title={t("tables.edit")}>
                <EditTwoTone
                  onClick={() => setEditTeacherId(item.id)}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title={t("tables.delete")}>
                <Popconfirm
                  title={t("pages.teachers.table.deleteTeacherConfirm")}
                  onConfirm={() => handleDeleteSchoolTeacher(item.id)}
                  okText={t("buttons.ok")}
                  cancelText={t("buttons.cancel")}
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
      });
    }
    return columns;
  }, [user]);

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
            title: (
              <Link to={routes.teachersPage}>
                {t("pages.teachers.breadcrumb.teachers")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {t("pages.teachers.title")}
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreateTeacherModalOpen(true)}
          >
            {t("pages.teachers.addTeacherBtn")}
          </Button>
        )}
      </div>
      <Table
        dataSource={tableData}
        columns={getTableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />
      <CreateTeacherModal
        t={t}
        isOpen={isCreateTeacherModalOpen}
        setIsCreateTeacherModalOpen={setIsCreateTeacherModalOpen}
      />
      <TeacherInfoDrawer
        t={t}
        isOpen={!!teacherInfoId}
        teacher={teachers.find((t) => t.id === teacherInfoId)}
        onClose={() => setTeacherInfoId(null)}
      />
      <EditTeacherDrawer
        t={t}
        isOpen={!!editTeacherId}
        id={editTeacherId}
        onClose={() => setEditTeacherId(null)}
      />
    </div>
  );
}

export default TeachersPage;
