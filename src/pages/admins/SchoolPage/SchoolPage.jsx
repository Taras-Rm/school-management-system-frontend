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
import React, { useState } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { getAdminSchool } from "../../../api/school";
import { useQuery } from "react-query";
import CreateSchoolModal from "./components/CreateSchoolModal";
import { routes } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import EditStudyPeriodModal from "./components/EditStudyPeriod";
import { getSchoolStudyPeriods } from "../../../api/studyPeriods";
import { formatDate } from "../../../utils/date";

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
  const navigate = useNavigate();

  const [isEditStudyPeriodModalOpen, setIsEditStudyPeriodModalOpen] =
    useState(false);

  const [activeStudyPeriod, setActiveStudyPeriod] = useState(null);

  const { data: school, isLoading } = useQuery(["school"], getAdminSchool, {
    retry: false,
  });

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
    }
  );

  if (isLoading) {
    return <Spin spinning />;
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
                title: <Link to={routes.adminSchoolPage}>School</Link>,
              },
            ]}
          />
          <Typography.Title level={2} style={{ margin: "15px 0" }}>
            {school.name} school
          </Typography.Title>
          <div style={{ marginBottom: 20 }}>
            <Button
              type="primary"
              style={{ backgroundColor: "green" }}
              onClick={() => navigate(routes.adminEditSchoolPage)}
            >
              Edit school
            </Button>
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
              <Col span={6}>
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
                      <Typography.Text type="secondary">
                        Study period
                      </Typography.Text>
                      <Button
                        size="small"
                        type="primary"
                        onClick={() => setIsEditStudyPeriodModalOpen(true)}
                      >
                        Change
                      </Button>
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
                  <Typography.Text style={{ fontSize: 30 }}>
                    435
                  </Typography.Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card
                  title={
                    <Typography.Text type="secondary">
                      Classes info
                    </Typography.Text>
                  }
                >
                  <Typography.Text style={{ fontSize: 30 }}>5</Typography.Text>
                </Card>
              </Col>
            </Row>
          </div>
          <EditStudyPeriodModal
            isOpen={isEditStudyPeriodModalOpen}
            setIsEditStudyPeriodModalOpen={setIsEditStudyPeriodModalOpen}
          />
        </div>
      ) : (
        <WithoutSchoolBoard />
      )}
    </div>
  );
}

export default SchoolPage;
