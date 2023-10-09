import React from "react";
import { routes } from "../../routes";
import { Breadcrumb, Button, Form, Typography } from "antd";
import { Link } from "react-router-dom";

function EditSchoolPage() {
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
            title: <Link to={routes.adminSchoolPage}>School</Link>,
          },
          {
            title: <Link to={routes.adminEditSchoolPage}>Edit school</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Edit school
      </Typography.Title>
    </div>
  );
}

export default EditSchoolPage;
