import { Breadcrumb, Button, Spin, Typography, message } from "antd";
import React, { useState } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "react-query";
import { getSchoolClass } from "../../../api/classes";
import CreateClassJournalsModal from "./components/CreateClassJournalsModal";

function ClassJournalsPage() {
  const { id } = useParams();
  const [isCreateClassJournalsModalOpen, setIsCreateClassJournalsModalOpen] =
    useState(false);

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  if (isLoading) return <Spin spinning />;

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
            title: <Link to={routes.adminClassesPage}>Classes</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.adminClassJournalsPage, { id })}>
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
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => setIsCreateClassJournalsModalOpen(true)}
        >
          Create
        </Button>
      </div>
      <CreateClassJournalsModal
        isOpen={isCreateClassJournalsModalOpen}
        setIsCreateClassJournalsModalOpen={setIsCreateClassJournalsModalOpen}
        classId={id}
      />
    </div>
  );
}

export default ClassJournalsPage;
