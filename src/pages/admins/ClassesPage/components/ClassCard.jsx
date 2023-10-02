import { Card, Typography, message } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../../routes";
import { getSchoolClassStudents } from "../../../../api/classes";
import { useQuery } from "react-query";

function ClassCard({ classInfo }) {
  const { data: students, isLoading: isLoadingStudents } = useQuery(
    ["students", "class", classInfo.id],
    () => getSchoolClassStudents({ id: classInfo.id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!classInfo.id,
    }
  );

  return (
    <Card
      title={
        <Link to={generatePath(routes.adminClassPage, { id: classInfo.id })}>
          <Typography.Title level={4}>{classInfo.name}</Typography.Title>
        </Link>
      }
      actions={[
        <Link
          style={{ width: "fit-content" }}
          to={generatePath(routes.adminEditClassPage, { id: classInfo.id })}
        >
          <EditOutlined />
        </Link>,
      ]}
      bordered={false}
      loading={isLoadingStudents}
    >
      <div>
        <Typography.Text>Class teacher: </Typography.Text>
        {classInfo.teacher ? (
          <Typography.Text
            strong
          >{`${classInfo.teacher.name} ${classInfo.teacher.surname}`}</Typography.Text>
        ) : (
          <Typography.Text>not defined</Typography.Text>
        )}
      </div>
      <div>
        <Typography.Text>Number of students: </Typography.Text>
        <Typography.Text strong>{students?.length}</Typography.Text>
      </div>
    </Card>
  );
}

export default ClassCard;
