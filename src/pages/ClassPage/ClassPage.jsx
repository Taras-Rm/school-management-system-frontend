import React, { useContext, useMemo, useState } from "react";
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
import {
  getSchoolClass,
  getSchoolClassStudents,
  unassignClassForStudents,
} from "../../api/classes";
import { generatePath, useNavigate, useParams } from "react-router";
import AssignClassForStudentsModal from "./components/AssignClassForStudentsModal";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import { CloseCircleTwoTone } from "@ant-design/icons";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";
import Loader from "../../components/Loader/Loader";

function ClassPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const [
    isAssignClassForStudentsModalOpen,
    setIsAssignClassForStudentsModalOpen,
  ] = useState(false);

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

  const { data: students, isLoading: isLoadingStudents } = useQuery(
    ["students", "class", id],
    () => getSchoolClassStudents({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const unassignStudentForClassMutation = useMutation(
    unassignClassForStudents,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["students", "class", id]);
      },
      onError: (err) => {
        message.error(
          "Failed to unassign student: " + err.response.data?.message
        );
      },
    }
  );

  const handleUnassignStudentForClass = (studentId) => {
    unassignStudentForClassMutation.mutate({
      id,
      studentsIds: [studentId],
    });
  };

  const tableColumns = useMemo(() => {
    let columns = [
      {
        title: t("tables.name"),
        dataIndex: "name",
        key: "name",
        render: (value, item) => {
          return `${value} ${item.surname}`;
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
        render: (_, item) => {
          return (
            <div>
              <Tooltip title={t("pages.class.table.unassignStudent")}>
                <CloseCircleTwoTone
                  onClick={() => handleUnassignStudentForClass(item.id)}
                  twoToneColor="#eb2f96"
                  style={{ cursor: "pointer" }}
                />
              </Tooltip>
            </div>
          );
        },
      });
    }
    return columns;
  }, user);

  const tableData = students?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  if (isLoading || isLoadingStudents) return <Loader />;

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
                {t("pages.class.breadcrumb.classes")}
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
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classData.level}-${classData.section}`} {t("pages.class.title")}
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          {user.role === "admin" && (
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => setIsAssignClassForStudentsModalOpen(true)}
            >
              {t("pages.class.assignStudentsBtn")}
            </Button>
          )}
          <Button
            type="primary"
            style={{ backgroundColor: "green", marginLeft: 10 }}
            onClick={() =>
              navigate(generatePath(routes.classSubjectsPage, { id: id }))
            }
          >
            {t("pages.class.subjectsBtn")}
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green", marginLeft: 10 }}
            onClick={() =>
              navigate(generatePath(routes.classSchedulePage, { id: id }))
            }
          >
            {t("pages.class.scheduleBtn")}
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "green", marginLeft: 10 }}
            onClick={() =>
              navigate(generatePath(routes.classJournalsPage, { id: id }))
            }
          >
            {t("pages.class.journalsBtn")}
          </Button>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <Typography.Text style={{ marginRight: 5 }}>
              {t("pages.class.classTeacher")}:
            </Typography.Text>
            {classData.teacher ? (
              <Typography.Text
                strong
              >{`${classData.teacher.name} ${classData.teacher.surname}`}</Typography.Text>
            ) : (
              <Typography.Text>{t("common.notDefined")}</Typography.Text>
            )}
          </div>
        </div>
      </div>

      <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />

      <AssignClassForStudentsModal
        t={t}
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
