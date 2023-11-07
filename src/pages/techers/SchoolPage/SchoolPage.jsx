import { Breadcrumb, Card, Col, Row, Spin, Typography, message } from "antd";
import React from "react";
import SchoolCardInfo from "../../../components/SchoolCardInfo/SchoolCardInfo";
import { getSchoolBasicInfo } from "../../../api/teachers/school";
import { useQuery } from "react-query";
import { getSchoolActiveStudyPeriod } from "../../../api/teachers/studyPeriods";
import { formatDate } from "../../../utils/date";
import { routes } from "../../routes";
import { Link } from "react-router-dom";

function TeacherSchoolPage() {
  const { data: schoolBasicInfo = {}, isLoadingSchoolBasicInfo } = useQuery(
    ["school", "basic_info"],
    getSchoolBasicInfo,
    {
      retry: false,
    }
  );

  const { data: activeStudyPeriod = [], isLoading: isLoadingStudyPeriod } =
    useQuery(["studyPeriods", "active"], () => getSchoolActiveStudyPeriod(), {
      onError: (error) => {
        message.error(error);
      },
    });

  if (isLoadingSchoolBasicInfo) return <Spin spinning />;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "rgb(215 215 215)",
        padding: "10px 20px",
      }}
    >
      <div>
        <Breadcrumb
          items={[
            {
              title: <Link to={routes.teacherSchoolPage}>School</Link>,
            },
          ]}
        />
        <Typography.Title level={2}>{"shjd"} school</Typography.Title>
        <div style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={12} style={{ marginBottom: 20 }}>
              <Card
                loading={isLoadingStudyPeriod}
                title={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography.Text type="secondary" style={{ fontSize: 18 }}>
                      Study period
                    </Typography.Text>
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
                title={"Teachers"}
                count={schoolBasicInfo.teachersCount}
              />
            </Col>
            <Col span={6}>
              <SchoolCardInfo
                title={"Classes"}
                count={schoolBasicInfo.classesCount}
              />
            </Col>
            <Col span={6}>
              <SchoolCardInfo
                title={"Students"}
                count={schoolBasicInfo.studentsCount}
              />
            </Col>
            <Col span={6}>
              <SchoolCardInfo
                title={"Subjects"}
                count={schoolBasicInfo.subjectsCount}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}

export default TeacherSchoolPage;
