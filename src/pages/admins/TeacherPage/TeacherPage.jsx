import React from "react";
import { routes } from "../../routes";
import { generatePath, useParams } from "react-router";
import {
  Breadcrumb,
  Card,
  Divider,
  Image,
  Spin,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import studentImg from "../../../assets/images/student.png";
import { MailTwoTone, PhoneTwoTone } from "@ant-design/icons";
import { getSchoolTeacher } from "../../../api/teachers";
import { genders } from "../../../utils/staticData";

function TeacherPage() {
  const { id } = useParams();

  const { data: teacher, isLoading } = useQuery(
    ["teachers", id],
    () => getSchoolTeacher({ id }),
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
            title: <Link to={routes.adminTeachersPage}>Teachers</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.adminTeacherPage, { id })}>
                {`${teacher.name} ${teacher.surname}`}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Teacher {`${teacher.name} ${teacher.surname}`}
      </Typography.Title>
      <div style={{ display: "flex" }}>
        <Card style={{ flex: 0.4 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Image width={100} preview={false} src={studentImg} />
            <Typography.Text
              style={{ fontSize: 22 }}
              strong
            >{`${teacher.name} ${teacher.surname}`}</Typography.Text>
            <Typography.Text style={{ fontSize: 18 }}>
              {teacher.address}
            </Typography.Text>

            <Divider />
            <div style={{ padding: "0 30px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: 8,
                }}
              >
                <MailTwoTone />
                <Typography.Text>{teacher.email}</Typography.Text>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <PhoneTwoTone />
                <Typography.Text>{teacher.phone}</Typography.Text>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ flex: 0.6, marginLeft: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text style={{ fontSize: 20 }}>
              Teacher of:
            </Typography.Text>
            <Typography.Text strong style={{ fontSize: 20 }}>
              Math
            </Typography.Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text style={{ fontSize: 20 }}>Degree:</Typography.Text>
            <Typography.Text strong style={{ fontSize: 20 }}>
              {teacher.degree}
            </Typography.Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text style={{ fontSize: 20 }}>
              Date of birth:
            </Typography.Text>
            <Typography.Text strong style={{ fontSize: 20 }}>
              {teacher.dob === "0001-01-01T00:00:00Z"
                ? ""
                : teacher?.dob.split("T")[0]}
            </Typography.Text>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography.Text style={{ fontSize: 20 }}>Gender:</Typography.Text>
            <Typography.Text strong style={{ fontSize: 20 }}>
              {genders.find((g) => g.value === teacher.gender)?.label}
            </Typography.Text>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TeacherPage;
