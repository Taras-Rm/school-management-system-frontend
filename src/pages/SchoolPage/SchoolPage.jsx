import {
  Alert,
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Spin,
  Typography,
  message,
} from "antd";
import React, { useContext, useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import CreateSchoolModal from "./components/CreateSchoolModal";
import { routes } from "../routes";
import { Link } from "react-router-dom";
import EditStudyPeriodModal from "./components/EditStudyPeriod";
import { formatDate } from "../../utils/date";
import EditSchoolDrawer from "../../components/EditSchoolDrawer/EditSchoolDrawer";
import SchoolCardInfo from "../../components/SchoolCardInfo/SchoolCardInfo";
import { getAdminSchool, getSchoolBasicInfo } from "../../api/school";
import { getSchoolStudyPeriods } from "../../api/studyPeriods";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";
import Loader from "../../components/Loader/Loader";

function WithoutSchoolBoard() {
  const [isCreateSchoolModalOpen, setIsCreateSchoolModalOpen] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90%",
      }}
    >
      <Typography.Title
        level={2}
        style={{ marginBottom: 30, textAlign: "center" }}
      >
        If you want to use a system, first of all you should create a school
      </Typography.Title>
      <Button
        onClick={() => setIsCreateSchoolModalOpen(true)}
        size="large"
        type="primary"
        style={{ backgroundColor: "green" }}
      >
        Create a school <PlusCircleOutlined />
      </Button>
      <CreateSchoolModal
        isOpen={isCreateSchoolModalOpen}
        setIsCreateSchoolModalOpen={setIsCreateSchoolModalOpen}
      />
    </div>
  );
}

function SchoolPage() {
  const { user } = useContext(UserContext);

  const [isEditStudyPeriodModalOpen, setIsEditStudyPeriodModalOpen] =
    useState(false);

  const [activeStudyPeriod, setActiveStudyPeriod] = useState(null);

  const [isEditSchoolDrawer, setIsEditSchoolDrawer] = useState(false);

  const { data: school, isLoading } = useQuery(["school"], getAdminSchool, {
    retry: false,
  });

  const { data: schoolBasicInfo = {}, isLoadingSchoolBasicInfo } = useQuery(
    ["school", "basic_info"],
    getSchoolBasicInfo,
    {
      retry: false,
      enabled: !!school,
    }
  );

  const { isLoading: isStudyPeriodsLoading } = useQuery(
    ["studyPeriods"],
    getSchoolStudyPeriods,
    {
      onSuccess: (data) => {
        setActiveStudyPeriod(data.find((sp) => sp.isActive));
      },
      onError: (err) => {
        message.error(
          "Failed to get school study periods: " + err.response.data?.message
        );
      },
      enabled: !!school,
      retry: RETRY_COUNT,
    }
  );

  const { t } = useTranslation();

  if (isLoading || isLoadingSchoolBasicInfo) {
    return <Loader />;
  }

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      {school ? (
        <div>
          <Breadcrumb
            items={[
              {
                title: (
                  <Link to={routes.schoolPage}>
                    {t("pages.school.breadcrumb.school")}
                  </Link>
                ),
              },
            ]}
          />
          <Typography.Title level={2} style={{ margin: "15px 0" }}>
            {school.name}
          </Typography.Title>
          <div style={{ marginBottom: 20 }}>
            {user.role === "admin" && (
              <Button
                type="primary"
                style={{ backgroundColor: "green" }}
                onClick={() => setIsEditSchoolDrawer(true)}
              >
                {t("buttons.change")}
              </Button>
            )}
          </div>
          {!activeStudyPeriod && !isStudyPeriodsLoading && (
            <Alert
              message="You should create study period before using the system"
              banner
              style={{ marginBottom: 20 }}
            />
          )}
          <div style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col span={12} style={{ marginBottom: 20 }}>
                <Card
                  loading={isStudyPeriodsLoading}
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography.Text
                        type="secondary"
                        style={{ fontSize: 18 }}
                      >
                        {t("common.studyPeriod")}
                      </Typography.Text>
                      {user.role === "admin" && (
                        <Button
                          type="primary"
                          onClick={() => setIsEditStudyPeriodModalOpen(true)}
                        >
                          {t("buttons.change")}
                        </Button>
                      )}
                    </div>
                  }
                >
                  <Typography.Text style={{ fontSize: 16 }}>
                    {activeStudyPeriod
                      ? `${formatDate(
                          new Date(activeStudyPeriod.startDate)
                        )} - ${formatDate(new Date(activeStudyPeriod.endDate))}`
                      : ""}
                  </Typography.Text>
                </Card>
              </Col>
              <Col span={12} />
              <Col span={6}>
                <SchoolCardInfo
                  t={t}
                  title={t("common.teachers")}
                  count={schoolBasicInfo.teachersCount}
                />
              </Col>
              <Col span={6}>
                <SchoolCardInfo
                  t={t}
                  title={t("common.classes")}
                  count={schoolBasicInfo.classesCount}
                />
              </Col>
              <Col span={6}>
                <SchoolCardInfo
                  t={t}
                  title={t("common.students")}
                  count={schoolBasicInfo.studentsCount}
                />
              </Col>
              <Col span={6}>
                <SchoolCardInfo
                  t={t}
                  title={t("common.subjects")}
                  count={schoolBasicInfo.subjectsCount}
                />
              </Col>
            </Row>
          </div>
          <EditStudyPeriodModal
            t={t}
            isOpen={isEditStudyPeriodModalOpen}
            setIsEditStudyPeriodModalOpen={setIsEditStudyPeriodModalOpen}
          />
          <EditSchoolDrawer
            t={t}
            isOpen={!!isEditSchoolDrawer}
            onClose={() => setIsEditSchoolDrawer(false)}
          />
        </div>
      ) : (
        <WithoutSchoolBoard />
      )}
    </div>
  );
}

export default SchoolPage;
