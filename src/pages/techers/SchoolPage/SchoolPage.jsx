import { Button, Card, Col, Row, Spin, Typography } from "antd";
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { getAdminSchool } from "../../../api/school";
import { useQuery } from "react-query";

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
