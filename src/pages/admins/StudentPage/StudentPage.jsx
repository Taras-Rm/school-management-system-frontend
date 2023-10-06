import React from "react";
import { routes } from "../../routes";
import { generatePath, useParams } from "react-router";
import {
  Breadcrumb,
  Button,
  Card,
  Divider,
  Image,
  Spin,
  Typography,
  message,
} from "antd";
import { Link } from "react-router-dom";
import { getSchoolStudent } from "../../../api/students";
import { useQuery } from "react-query";
import studentImg from "../../../assets/images/student.png";
import { MailTwoTone } from "@ant-design/icons";

function StudentPage() {
  const { id } = useParams();

  const { data: student, isLoading } = useQuery(
    ["students", id],
    () => getSchoolStudent({ id }),
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
            title: <Link to={routes.adminStudentsPage}>Students</Link>,
          },
          {
            title: (
              <Link to={generatePath(routes.adminStudentPage, { id })}>
                {`${student.name} ${student.surname}`}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Student {`${student.name} ${student.surname}`}
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
            >{`${student.name} ${student.surname}`}</Typography.Text>
            <Typography.Text style={{ fontSize: 18 }}>
              Chikago, city
            </Typography.Text>
            <Typography.Text style={{ fontSize: 16 }}>
              Class:
              {student?.class
                ? `${student.class.level}-${student.class.section}`
                : "none"}
            </Typography.Text>
            <Divider />
            <div style={{ padding: "0 30px", width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <MailTwoTone />
                <Typography.Text>{student.email}</Typography.Text>
              </div>
            </div>
          </div>
        </Card>
        <Card style={{ flex: 0.6, marginLeft: 20 }}></Card>
      </div>
    </div>
  );
}

export default StudentPage;
