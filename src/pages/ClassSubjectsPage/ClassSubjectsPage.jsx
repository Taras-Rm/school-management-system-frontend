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
import React, { useState } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  deleteClassSubject,
  getClassSubjects,
  getSchoolClass,
} from "../../api/admins/classes";
import CreateClassSubjectModal from "./components/CreateClassSubjectModal";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import EditClassSubjectModal from "./components/EditClassSubjectModal";

function ClassSubjectsPage() {
  const { id } = useParams();
  const queryClient = useQueryClient();

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
    }
  );

  const { data: classSubjects = [], isLoading: isLoadingClassSubjects } =
    useQuery(["classes", id, "subjects"], () => getClassSubjects({ id }), {
      onError: (error) => {
        message.error(error);
      },
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

  const tableColumns = [
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (value, item) => {
        return value.name;
      },
    },
    {
      title: "Teacher",
      dataIndex: "teacherId",
      key: "teacherId",
      render: (value, item) => {
        return value ? `${item.teacher.name} ${item.teacher.surname}` : "";
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
            <Tooltip title="Edit subject">
              <EditTwoTone
                onClick={() => setUpdateClassSubjectId(item.id)}
                style={{ cursor: "pointer" }}
              />
            </Tooltip>
            <Tooltip title="Delete subject">
              <Popconfirm
                title="Do you really want to delete subject ?"
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
    },
  ];

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
            title: <Link to={routes.classesPage}>Classes</Link>,
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
                Subjects
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classData.level}-${classData.section}`} subjects
      </Typography.Title>
      <div
        style={{
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateClassSubjectModalOpen(true)}
        >
          Add
        </Button>
      </div>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        loading={isLoadingClassSubjects}
      />
      <CreateClassSubjectModal
        isOpen={isCreateClassSubjectModalOpen}
        setIsCreateClassSubjectModalOpen={setIsCreateClassSubjectModalOpen}
        classId={id}
      />
      <EditClassSubjectModal
        classSubjectId={updateClassSubjectId}
        setUpdateClassSubjectId={setUpdateClassSubjectId}
        classId={id}
      />
    </div>
  );
}

export default ClassSubjectsPage;
