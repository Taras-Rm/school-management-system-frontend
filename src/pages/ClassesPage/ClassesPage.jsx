import { Breadcrumb, Button, Col, Row, Spin, Typography, message } from "antd";
import React, { useContext, useState } from "react";
import { getSchoolClasses } from "../../api/classes";
import ClassCard from "./components/ClassCard";
import { useQuery } from "react-query";
import CreateClassModal from "./components/CreateClassModal";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import EditClassDrawer from "../../components/EditClassDrawer/EditClassDrawer";
import UserContext from "../../user-context";
import { getTeacherSchoolClasses } from "../../api/teachers";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";
import Loader from "../../components/Loader/Loader";

function ClassesPage() {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);

  const [editClassId, setEditClassId] = useState(null);

  const { data: classes, isLoading } = useQuery(
    ["classes"],
    user.role === "admin"
      ? () => getSchoolClasses()
      : () => getTeacherSchoolClasses({ id: user.id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!user,
      retry: RETRY_COUNT
    }
  );

  if (isLoading) return <Loader />;

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
            title: (
              <Link to={routes.classesPage}>
                {t("pages.classes.breadcrumb.classes")}
              </Link>
            ),
          },
        ]}
      />

      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {t("pages.classes.title")}
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => setIsCreateClassModalOpen(true)}
          >
            {t("pages.classes.addClassBtn")}
          </Button>
        )}
      </div>
      <Row gutter={20}>
        {classes.map((c) => (
          <Col span={6} style={{ marginBottom: 20 }} key={c.id}>
            <ClassCard
              t={t}
              classInfo={c}
              setEditClassId={setEditClassId}
              showActions={user.role === "admin"}
            />
          </Col>
        ))}
      </Row>
      <CreateClassModal
        t={t}
        isOpen={isCreateClassModalOpen}
        setIsCreateClassModalOpen={setIsCreateClassModalOpen}
      />
      <EditClassDrawer
        t={t}
        isOpen={!!editClassId}
        id={editClassId}
        onClose={() => setEditClassId(null)}
      />
    </div>
  );
}

export default ClassesPage;
