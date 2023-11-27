import React, { useMemo, useState } from "react";
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
import CreateStudentModal from "./components/CreateStudentModal";
import { deleteSchoolStudent, getSchoolStudents } from "../../api/students";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditStudentDrawer from "../../components/EditStudentDrawer/EditStudentDrawer";
import StudentInfoDrawer from "../../components/StudentInfoDrawer/StudentInfoDrawer";
import { useContext } from "react";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";

function StudentsPage() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();
  const [isCreateStudentModalOpen, setIsCreateStudentModalOpen] =
    useState(false);

  const [editStudentId, setEditStudentId] = useState(null);
  const [studentInfoId, setStudentInfoId] = useState(null);

  const { data: students, isLoading } = useQuery(
    ["students"],
    getSchoolStudents,
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
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

  const tableColumns = useMemo(() => {
    let columns = [
      {
        title: t("tables.name"),
        dataIndex: "name",
        key: "name",
        render: (value, item) => {
          return (
            <Link
              onClick={() => setStudentInfoId(item.id)}
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
      {
        title: t("tables.class"),
        dataIndex: "Class",
        key: "class.name",
        render: (value, item) => {
          return item.class
            ? `${item?.class?.level}-${item?.class?.section}`
            : "";
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
                  onClick={() => setEditStudentId(item.id)}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title={t("tables.delete")}>
                <Popconfirm
                  okText={t("buttons.ok")}
                  cancelText={t("buttons.cancel")}
                  title={t("pages.students.table.deleteStudentConfirm")}
                  onConfirm={() => handleDeleteSchoolStudent(item.id)}
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
        position: "relative",
      }}
    >
      <Breadcrumb
        items={[
          {
            title: (
              <Link to={routes.studentsPage}>
                {t("pages.students.breadcrumb.students")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {t("pages.students.title")}
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreateStudentModalOpen(true)}
          >
            {t("pages.students.addStudentBtn")}
          </Button>
        )}
      </div>
      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />
      <CreateStudentModal
        t={t}
        isOpen={isCreateStudentModalOpen}
        setIsCreateStudentModalOpen={setIsCreateStudentModalOpen}
      />
      <StudentInfoDrawer
        t={t}
        isOpen={!!studentInfoId}
        student={students.find((s) => s.id === studentInfoId)}
        onClose={() => setStudentInfoId(null)}
      />
      <EditStudentDrawer
        t={t}
        isOpen={!!editStudentId}
        id={editStudentId}
        onClose={() => setEditStudentId(null)}
      />
    </div>
  );
}

export default StudentsPage;
