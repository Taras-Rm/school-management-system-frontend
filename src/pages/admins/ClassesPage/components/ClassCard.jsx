import { Card, Typography } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";
import { Link, generatePath } from "react-router-dom";
import { routes } from "../../../routes";

function ClassCard({ id, title }) {
  return (
    <Card
      title={
        <Link to={generatePath(routes.adminClassPage, { id: id })}>
          <Typography.Title level={4}>{title}</Typography.Title>
        </Link>
      }
      actions={[<EditOutlined />]}
      bordered={false}
    />
  );
}

export default ClassCard;
