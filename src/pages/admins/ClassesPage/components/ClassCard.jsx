import { Card, Typography } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../../routes";

function ClassCard({ classInfo }) {
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
    </Card>
  );
}

export default ClassCard;
