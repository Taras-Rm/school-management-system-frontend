import { Breadcrumb, Button, Col, Row, Spin, Typography, message } from "antd";
import React, { useContext, useState } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useQuery } from "react-query";
import { getClassJournals, getSchoolClass } from "../../api/classes";
import CreateClassJournalsModal from "./components/CreateClassJournalsModal";
import JournalCard from "./components/JournalCard";
import UserContext from "../../user-context";

function ClassJournalsPage() {
  const { id } = useParams();
  const [isCreateClassJournalsModalOpen, setIsCreateClassJournalsModalOpen] =
    useState(false);

  const { user } = useContext(UserContext);

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: classJournals = [], isLoading: isLoadingJournals } = useQuery(
    ["classes", id, "journals"],
    () => getClassJournals({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  if (isLoading || isLoadingJournals) return <Spin spinning />;

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
            title: <Link to={routes.classesPage}>Classes</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.classPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classJournalsPage, { id })}>
                Journals
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classData.level}-${classData.section}`} class journals
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreateClassJournalsModalOpen(true)}
          >
            Create
          </Button>
        )}
      </div>
      <Row gutter={20}>
        {classJournals.map((c) => (
          <Col span={8} style={{ marginBottom: 20 }} key={c.id}>
            <JournalCard journalInfo={c} classId={id} />
          </Col>
        ))}
      </Row>
      <CreateClassJournalsModal
        isOpen={isCreateClassJournalsModalOpen}
        setIsCreateClassJournalsModalOpen={setIsCreateClassJournalsModalOpen}
        classId={id}
        disabledClassSubjectsIds={classJournals.map((cJ) => cJ.classSubjectId)}
      />
    </div>
  );
}

export default ClassJournalsPage;
