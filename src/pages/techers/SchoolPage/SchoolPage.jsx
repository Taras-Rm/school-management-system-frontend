import { Card, Col, Row, Typography } from "antd";
import React from "react";

function TeacherSchoolPage() {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      <div>
        <Typography.Title level={2}>{"shjd"} school</Typography.Title>
        <div style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card
                title={
                  <Typography.Text type="secondary">
                    Teachers
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
                    Students
                  </Typography.Text>
                }
              >
                <Typography.Text style={{ fontSize: 30 }}>435</Typography.Text>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default TeacherSchoolPage;
