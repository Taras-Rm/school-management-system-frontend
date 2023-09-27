import { Button, Col, Row, Spin, Typography, message } from "antd";
import React, { useState } from "react";
import { getSchoolClasses } from "../../../api/classes";
import ClassCard from "./components/ClassCard";
import { useQuery } from "react-query";
import CreateClassModal from "./components/CreateClassModal";

function ClassesPage() {
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);

  const {
    data: classes,
    error,
    isLoading,
  } = useQuery(["classes"], getSchoolClasses, {
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
      <Typography.Title level={2}>Classes</Typography.Title>
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
          <Col span={6} style={{ marginBottom: 20 }}>
            <ClassCard id={c.id} title={c.name} />
          </Col>
        ))}
      </Row>
      <CreateClassModal
        isOpen={isCreateClassModalOpen}
        setIsCreateClassModalOpen={setIsCreateClassModalOpen}
      />
    </div>
  );
}

export default ClassesPage;
