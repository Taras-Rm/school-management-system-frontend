import { Breadcrumb, Button, Col, Row, Spin, Typography, message } from "antd";
import React, { useState } from "react";
import { getSchoolClasses } from "../../../api/classes";
import ClassCard from "./components/ClassCard";
import { useQuery } from "react-query";
import CreateClassModal from "./components/CreateClassModal";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import EditClassDrawer from "../../../components/EditClassDrawer/EditClassDrawer";

function ClassesPage() {
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);

  const [editClassId, setEditClassId] = useState(null);

  const { data: classes, isLoading } = useQuery(["classes"], getSchoolClasses, {
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
            title: <Link to={routes.adminClassesPage}>Classes</Link>,
          },
        ]}
      />

      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Classes
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateClassModalOpen(true)}
        >
          Add class
        </Button>
      </div>
      <Row gutter={20}>
        {classes.map((c) => (
          <Col span={6} style={{ marginBottom: 20 }} key={c.id}>
            <ClassCard classInfo={c} setEditClassId={setEditClassId} />
          </Col>
        ))}
      </Row>
      <CreateClassModal
        isOpen={isCreateClassModalOpen}
        setIsCreateClassModalOpen={setIsCreateClassModalOpen}
      />
      <EditClassDrawer
        isOpen={!!editClassId}
        id={editClassId}
        onClose={() => setEditClassId(null)}
      />
    </div>
  );
}

export default ClassesPage;
