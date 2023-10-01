import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Spin,
  Table,
  Typography,
  message,
} from "antd";
import { useQuery } from "react-query";
import { getSchoolClass, getSchoolClassStudents } from "../../../api/classes";
import { generatePath, useParams } from "react-router";
import AssignClassForStudentsModal from "./components/AssignClassForStudentsModal";
import { routes } from "../../routes";
import { Link } from "react-router-dom";

function ClassPage() {
  const { id } = useParams();
  const [
    isAssignClassForStudentsModalOpen,
    setIsAssignClassForStudentsModalOpen,
  ] = useState(false);

  const {
    data: classData,
    error,
    isLoading,
  } = useQuery(["classes", id], () => getSchoolClass({ id }), {
    onError: (error) => {
      message.error(error);
    },
  });

  const {
    data: students,
    error: studentsError,
    isLoading: isLoadingStudents,
  } = useQuery(
    ["students", "class", id],
    () => getSchoolClassStudents({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (value, item) => {
        return `${value} ${item.surname}`;
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
  ];

  const tableData = students?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  if (isLoading || isLoadingStudents) return <Spin spinning />;

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
                {classData.name}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {classData.name} class
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
          onClick={() => setIsAssignClassForStudentsModalOpen(true)}
        >
          Assign students
        </Button>
        <div>
          <div style={{ display: "flex", alignItems: "center", fontSize: 18 }}>
            <Typography.Text style={{ marginRight: 5 }}>
              Class teacher:
            </Typography.Text>
            {classData.teacher ? (
              <Typography.Text
                strong
              >{`${classData.teacher.name} ${classData.teacher.surname}`}</Typography.Text>
            ) : (
              <Typography.Text>not defined</Typography.Text>
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
