import { Breadcrumb, Button, Spin, Table, Typography, message } from "antd";
import React, { useState } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "react-query";
import { getClassSubjects, getSchoolClass } from "../../../api/classes";
import CreateClassSubjectModal from "./components/CreateClassSubjectModal";

function ClassSubjectsPage() {
  const { id } = useParams();
  const [isCreateClassSubjectModalOpen, setIsCreateClassSubjectModalOpen] =
    useState(false);

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
            title: <Link to={routes.adminClassesPage}>Classes</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassSubjectsPage, { id })}>
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
    </div>
  );
}

export default ClassSubjectsPage;
