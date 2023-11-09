import { Breadcrumb, Col, Row, Spin, Typography, message } from "antd";
import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useQuery } from "react-query";
import UserContext from "../../user-context";
import { getTeacherJournals } from "../../api/teachers";
import JournalCard from "./components/JournalCard";

function JournalsPage() {
  const [isCreateClassJournalsModalOpen, setIsCreateClassJournalsModalOpen] =
    useState(false);

  const { user } = useContext(UserContext);

  const { data: journals = [], isLoading: isLoadingJournals } = useQuery(
    ["journals"],
    () => getTeacherJournals({ id: user.id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!user,
    }
  );

  if (isLoadingJournals) return <Spin spinning />;

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
            title: <Link to={routes.journalsPage}>Journals</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Journals
      </Typography.Title>
      <div style={{ marginBottom: 20 }}></div>
      <Row gutter={20}>
        {journals.map((c) => (
          <Col span={8} style={{ marginBottom: 20 }} key={c.id}>
            <JournalCard journalInfo={c} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default JournalsPage;
