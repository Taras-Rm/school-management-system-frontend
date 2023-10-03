import React from "react";
import { routes } from "../../routes";
import { Breadcrumb, Button, List, Spin, Typography, message } from "antd";
import { Link } from "react-router-dom";
import { getSchoolSubjects } from "../../../api/subjects";
import { useQuery } from "react-query";

function SubjectsPage() {
  const {
    data: subjects,
    error,
    isLoading,
  } = useQuery(["subjects"], getSchoolSubjects, {
    onError: (error) => {
      message.error(error);
    },
  });

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
        <Button type="primary" style={{ backgroundColor: "green" }}>
          Add subject
        </Button>
      </div>
      <List
        itemLayout="horizontal"
        dataSource={subjects}
        renderItem={(item) => {
          return (
            <List.Item
              actions={[<Link>Edit</Link>]}
              style={{ padding: "15px 30px" }}
            >
              {item.name}
            </List.Item>
          );
        }}
        style={{ backgroundColor: "white" }}
      />
      {/* <Table
        dataSource={tableData}
        columns={tableColumns}
        scroll={{ y: 400 }}
        pagination={false}
      />
      <CreateStudentModal
        isOpen={isCreateStudentModalOpen}
        setIsCreateStudentModalOpen={setIsCreateStudentModalOpen}
      /> */}
    </div>
  );
}

export default SubjectsPage;
