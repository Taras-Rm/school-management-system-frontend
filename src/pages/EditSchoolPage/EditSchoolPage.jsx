import React from "react";
import { routes } from "../routes";
import { Breadcrumb, Typography } from "antd";
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
            title: <Link to={routes.schoolPage}>School</Link>,
          },
          {
            title: <Link to={routes.editSchoolPage}>Edit school</Link>,
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
