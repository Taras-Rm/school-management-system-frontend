import React, { useState } from "react";
import { routes } from "../routes";
import {
  Breadcrumb,
  Button,
  List,
  Popconfirm,
  Spin,
  Tooltip,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { deleteSchoolSubject, getSchoolSubjects } from "../../api/subjects";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CreateSubjectModal from "./components/CreateSubjectModal";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditSubjectModal from "./components/EditSubjectModal";
import { useContext } from "react";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";
import Loader from "../../components/Loader/Loader";

function SubjectsPage() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();

  const [isCreateSubjectModalOpen, setIsCreateSubjectModalOpen] =
    useState(false);

  const [editSubjectId, setEditSubjectId] = useState(null);

  const { data: subjects, isLoading } = useQuery(
    ["subjects"],
    getSchoolSubjects,
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const deleteSubjectMutation = useMutation(deleteSchoolSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects"]);
      message.success(t("pages.subjects.list.msgDeleted"));
    },
    onError: (err) => {
      message.error("Failed to delete subject: " + err.response.data?.message);
    },
  });

  const handleDeleteSubject = (id) => {
    deleteSubjectMutation.mutate({
      id,
    });
  };

  if (isLoading) return <Loader />;

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
              <Link to={routes.subjectsPage}>
                {t("pages.subjects.breadcrumb.subjects")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {t("pages.subjects.title")}
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreateSubjectModalOpen(true)}
          >
            {t("pages.subjects.addSubjectBtn")}
          </Button>
        )}
      </div>
      <List
        itemLayout="horizontal"
        dataSource={subjects}
        renderItem={(item) => {
          return (
            <List.Item
              actions={
                item.schoolId &&
                user.role === "admin" && [
                  <Tooltip title={t("tables.edit")}>
                    <EditTwoTone
                      onClick={() => setEditSubjectId(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>,
                  <Tooltip title={t("tables.delete")}>
                    <Popconfirm
                      okText={t("buttons.ok")}
                      cancelText={t("buttons.cancel")}
                      title={t("pages.subjects.list.deleteSubjectConfirm")}
                      onConfirm={() => handleDeleteSubject(item.id)}
                    >
                      <DeleteTwoTone
                        twoToneColor="#eb2f96"
                        style={{ cursor: "pointer" }}
                      />
                    </Popconfirm>
                  </Tooltip>,
                ]
              }
              style={{ padding: "10px 20px" }}
            >
              {item.name}
            </List.Item>
          );
        }}
        style={{ backgroundColor: "white" }}
      />
      <CreateSubjectModal
        t={t}
        isOpen={isCreateSubjectModalOpen}
        setIsCreateSubjectModalOpen={setIsCreateSubjectModalOpen}
      />
      <EditSubjectModal
        t={t}
        subjectId={editSubjectId}
        setEditSubjectId={setEditSubjectId}
      />
    </div>
  );
}

export default SubjectsPage;
