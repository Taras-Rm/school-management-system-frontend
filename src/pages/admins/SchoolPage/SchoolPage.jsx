import { Button, Card, Col, Row, Spin, Typography } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { getAdminSchool } from "../../../api/school";
import { useQuery } from "react-query";
import CreateSchoolModal from "./components/CreateSchoolModal";

function WithoutSchoolBoard() {
  const [isCreateSchoolModalOpen, setIsCreateSchoolModalOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <Typography.Title level={2} style={{ marginBottom: 30 }}>
        If you want to use a system, first of all you should create a school
      </Typography.Title>
      <Button
        onClick={() => setIsCreateSchoolModalOpen(true)}
        size="large"
        type="primary"
        style={{ backgroundColor: "green" }}
      >
        Create a school <PlusCircleOutlined />
      </Button>
      <CreateSchoolModal
        isOpen={isCreateSchoolModalOpen}
        setIsCreateSchoolModalOpen={setIsCreateSchoolModalOpen}
      />
    </div>
  );
}

function SchoolPage() {
  const {
    data: school,
    isLoading,
    error,
  } = useQuery(["school"], getAdminSchool, {
    retry: false,
  });

  if (isLoading) {
    return <Spin spinning />;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      {school ? (
        <div>
          <Typography.Title level={2}>{school.name} school</Typography.Title>
          <div style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col span={6}>
                <Card
                  title={
                    <Typography.Text type="secondary">
                      Teachers info
                    </Typography.Text>
                  }
                >
                  <Typography.Text style={{ fontSize: 30 }}>45</Typography.Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title={
                    <Typography.Text type="secondary">
                      Students info
                    </Typography.Text>
                  }
                >
                  <Typography.Text style={{ fontSize: 30 }}>
                    435
                  </Typography.Text>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <WithoutSchoolBoard />
      )}
    </div>
  );
}

export default SchoolPage;
