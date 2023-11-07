import { Card, Col, Row, Spin, Typography } from "antd";
import React from "react";
import SchoolCardInfo from "../../../components/SchoolCardInfo/SchoolCardInfo";
import { getSchoolBasicInfo } from "../../../api/teachers/school";
import { useQuery } from "react-query";

function TeacherSchoolPage() {
  const { data: schoolBasicInfo = {}, isLoadingSchoolBasicInfo } = useQuery(
    ["school", "basic_info"],
    getSchoolBasicInfo,
    {
      retry: false,
    }
  );

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
        <Typography.Title level={2}>{"shjd"} school</Typography.Title>
        <div style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col span={6}>
              <SchoolCardInfo
                title={"Teachers"}
                count={schoolBasicInfo.teachersCount}
              />
            </Col>
            <Col span={6}>
              <SchoolCardInfo
                title={"Classes"}
                count={schoolBasicInfo.studentsCount}
              />
            </Col>
            <Col span={6}>
              <SchoolCardInfo
                title={"Students"}
                count={schoolBasicInfo.classesCount}
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
