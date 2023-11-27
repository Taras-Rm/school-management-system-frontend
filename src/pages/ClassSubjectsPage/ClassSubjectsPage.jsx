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
import React, { useMemo, useState } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteClassSubject,
  getClassSubjects,
  getSchoolClass,
} from "../../api/classes";
import CreateClassSubjectModal from "./components/CreateClassSubjectModal";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditClassSubjectModal from "./components/EditClassSubjectModal";
import { useContext } from "react";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";

function ClassSubjectsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { user } = useContext(UserContext);

  const [isCreateClassSubjectModalOpen, setIsCreateClassSubjectModalOpen] =
    useState(false);

  const [updateClassSubjectId, setUpdateClassSubjectId] = useState(null);

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: classSubjects = [], isLoading: isLoadingClassSubjects } =
    useQuery(["classes", id, "subjects"], () => getClassSubjects({ id }), {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    });

  const deleteClassSubjectMutation = useMutation(deleteClassSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["classes", id, "subjects"]);
      message.success("Subject is deleted!");
    },
    onError: (err) => {
      message.error("Failed to delete subject: " + err.response.data?.message);
    },
  });

  const handleDeleteClassSubject = (subjectId) => {
    deleteClassSubjectMutation.mutate({
      classId: id,
      subjectId,
    });
  };

  const tableData = classSubjects?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  const tableColumns = useMemo(() => {
    let columns = [
      {
        title: t("tables.subject"),
        dataIndex: "subject",
        key: "subject",
        render: (value, item) => {
          return value.name;
        },
      },
      {
        title: t("tables.teacher"),
        dataIndex: "teacherId",
        key: "teacherId",
        render: (value, item) => {
          return value ? `${item.teacher.name} ${item.teacher.surname}` : "";
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
                  onClick={() => setUpdateClassSubjectId(item.id)}
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip title={t("tables.delete")}>
                <Popconfirm
                  title={t(
                    "pages.classSubjects.table.deleteClassSubjectConfirm"
                  )}
                  okText={t("buttons.delete")}
                  cancelText={t("buttons.cancel")}
                  onConfirm={() => handleDeleteClassSubject(item.id)}
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
  }, [user.role]);

  if (isLoading) return <Spin spinning />;

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
            title: (
              <Link to={routes.classesPage}>
                {t("pages.classSubjects.breadcrumb.classes")}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classSubjectsPage, { id })}>
                {t("pages.classSubjects.breadcrumb.subjects")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${t("pages.classSubjects.title")} ${classData.level}-${
          classData.section
        }`}
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreateClassSubjectModalOpen(true)}
          >
            {t("pages.classSubjects.addClassSubjectBtn")}
          </Button>
        )}
      </div>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        loading={isLoadingClassSubjects}
      />
      <CreateClassSubjectModal
        t={t}
        isOpen={isCreateClassSubjectModalOpen}
        setIsCreateClassSubjectModalOpen={setIsCreateClassSubjectModalOpen}
        classId={id}
      />
      <EditClassSubjectModal
        t={t}
        classSubjectId={updateClassSubjectId}
        setUpdateClassSubjectId={setUpdateClassSubjectId}
        classId={id}
      />
    </div>
  );
}

export default ClassSubjectsPage;
