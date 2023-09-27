import React from "react";
import { Button, Col, Row, Spin, Typography, message } from "antd";
import { useQuery } from "react-query";
import { getSchoolClass } from "../../../api/classes";
import { useParams } from "react-router";

function ClassPage() {
  const { id } = useParams();

  const {
    data: classData,
    error,
    isLoading,
  } = useQuery(["classes", id], () => getSchoolClass({ id }), {
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
      <Typography.Title level={2}>{classData.name} class</Typography.Title>
      <div style={{ marginBottom: 20 }}>e</div>
    </div>
  );
}

export default ClassPage;
