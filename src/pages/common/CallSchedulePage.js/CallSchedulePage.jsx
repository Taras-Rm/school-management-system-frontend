import React from "react";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Tabs, Typography } from "antd";

function CallSchedulePage() {
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
            title: <Link to={routes.adminSchedulePage}>Schedule</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Schedule
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" style={{ backgroundColor: "green" }}>
          Edit schedule
        </Button>
      </div>
    </div>
  );
}

export default CallSchedulePage;
