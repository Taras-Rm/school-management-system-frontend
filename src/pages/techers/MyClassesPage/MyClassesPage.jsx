import { Breadcrumb, Button, Col, Row, Spin, Typography, message } from "antd";
import React, { useState } from "react";
import { getSchoolClasses } from "../../../api/admins/classes";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import EditClassDrawer from "../../../components/EditClassDrawer/EditClassDrawer";
import { getAssignedSchoolClasses } from "../../../api/teachers/classes";
import ClassCard from "./components/ClassCard";

function MyClassesPage() {
  const { data: classes, isLoading } = useQuery(
    ["classes"],
    getAssignedSchoolClasses,
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

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
            title: <Link to={routes.teacherMyClassesPage}>Classes</Link>,
          },
        ]}
      />

      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Classes
      </Typography.Title>
      <div style={{ marginBottom: 20 }}></div>
      <Row gutter={20}>
        {classes.map((c) => (
          <Col span={6} style={{ marginBottom: 20 }} key={c.id}>
            <ClassCard classInfo={c} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default MyClassesPage;
