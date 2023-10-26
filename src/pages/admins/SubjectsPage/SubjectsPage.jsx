import React, { useState } from "react";
import { routes } from "../../routes";
import {
  Breadcrumb,
  Button,
  List,
  Spin,
  Tooltip,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { deleteSchoolSubject, getSchoolSubjects } from "../../../api/subjects";
import { useMutation, useQuery, useQueryClient } from "react-query";
import CreateSubjectModal from "./components/CreateSubjectModal";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditSubjectModal from "./components/EditSubjectModal";

function SubjectsPage() {
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
    }
  );

  const deleteSubjectMutation = useMutation(deleteSchoolSubject, {
    onSuccess: () => {
      queryClient.invalidateQueries(["subjects"]);
      message.success("Subject is deleted!");
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
            title: <Link to={routes.adminSubjectsPage}>Subjects</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Subjects
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateSubjectModalOpen(true)}
        >
          Add subject
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={subjects}
        renderItem={(item) => {
          return (
            <List.Item
              actions={
                item.schoolId && [
                  <Tooltip title="Edit subject">
                    <EditTwoTone
                      onClick={() => setEditSubjectId(item.id)}
                      style={{ cursor: "pointer" }}
                    />
                  </Tooltip>,
                  <Tooltip title="Edit subject">
                    <DeleteTwoTone
                      onClick={() => handleDeleteSubject(item.id)}
                      twoToneColor="#eb2f96"
                      style={{ cursor: "pointer" }}
                    />
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
        isOpen={isCreateSubjectModalOpen}
        setIsCreateSubjectModalOpen={setIsCreateSubjectModalOpen}
      />
      <EditSubjectModal
        subjectId={editSubjectId}
        setEditSubjectId={setEditSubjectId}
      />
    </div>
  );
}

export default SubjectsPage;
