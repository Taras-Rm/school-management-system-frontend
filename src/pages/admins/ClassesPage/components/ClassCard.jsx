import { Card, Typography } from "antd";
import React from "react";
import { EditOutlined } from "@ant-design/icons";

function ClassCard({ title }) {
  return (
    <Card
      title={<Typography.Title level={4}>{title}</Typography.Title>}
      actions={[<EditOutlined />]}
      bordered={false}
    />
  );
}

export default ClassCard;
