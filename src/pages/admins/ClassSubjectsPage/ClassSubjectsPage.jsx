import { Breadcrumb, Button, Spin, Table, Typography, message } from "antd";
import React from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "react-query";
import { getSchoolClass } from "../../../api/classes";

function ClassSubjectsPage() {
  const { id } = useParams();

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const data = [
    {
      id: 1,
      classId: 2,
      teacherId: 34,
      subjectId: 4,
      teacher: {
        name: "Tom",
        surname: "Cruz",
      },
      subject: {
        name: "Math",
      },
    },
    {
      id: 2,
      classId: 2,
      teacherId: 36,
      subjectId: 5,
      teacher: {
        name: "Tom1",
        surname: "Cruz1",
      },
      subject: {
        name: "Math 2",
      },
    },
  ];

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
      dataIndex: "teacher",
      key: "teacher",
      render: (value, item) => {
        return `${value.name} ${value.surname}`;
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
          onClick={() => {}}
        >
          Edit
        </Button>
      </div>
      <Table columns={tableColumns} dataSource={data} pagination={false} />
    </div>
  );
}

export default ClassSubjectsPage;
