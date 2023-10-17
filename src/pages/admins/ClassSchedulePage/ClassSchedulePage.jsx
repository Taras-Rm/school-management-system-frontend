import { Breadcrumb, Button, Spin, Table, Typography, message } from "antd";
import React from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "react-query";
import { getSchoolClass } from "../../../api/classes";
import { getSchoolCallsSchedule } from "../../../api/callsSchedule";
import { prepareScheduleTable } from "./classScheduleHelper";
import { formatTime } from "../../../utils/date";

function ClassSchedulePage() {
  const { id } = useParams();

  const data = [
    {
      id: 1,
      classId: 26,
      class: {
        id: 2,
        section: "A",
        level: 2,
      },
      classSubjectId: 3,
      classSubject: {
        classId: 2,
        subjectId: 6,
        subject: {
          name: "Math",
        },
        teacherId: 8,
        teacher: {
          name: "Natalia",
          surname: "Romaniuk",
        },
      },
      dayOfWeek: "mon",
      orderNumber: 1,
      studyPeriodId: 4,
    },
    {
      id: 3,
      classId: 26,
      class: {
        id: 2,
        section: "A",
        level: 2,
      },
      classSubjectId: 5,
      classSubject: {
        classId: 2,
        subjectId: 9,
        subject: {
          name: "Music",
        },
        teacherId: 10,
        teacher: {
          name: "Andrii",
          surname: "Chaplya",
        },
      },
      dayOfWeek: "tue",
      orderNumber: 3,
      studyPeriodId: 4,
    },
  ];

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
    });

  const tableColumns = [
    {
      title: "#",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (value, item) => {
        return value;
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (value, item) => {
        return `${formatTime(new Date(item.startTime))} - ${formatTime(
          new Date(item.endTime)
        )}`;
      },
    },
    {
      title: "Monday",
      dataIndex: "mon",
      key: "mon",
      render: (value, item) => {
        return item.days.mon ? item.days.mon.subject.name : "";
      },
    },
    {
      title: "Tuesday",
      dataIndex: "tue",
      key: "tue",
      render: (value, item) => {
        return item.days.tue ? item.days.tue.subject.name : "";
      },
    },
    {
      title: "Wednesday",
      dataIndex: "wed",
      key: "wed",
      render: (value, item) => {
        return item.days.wed ? item.days.wed.subject.name : "";
      },
    },
    {
      title: "Thursday",
      dataIndex: "thu",
      key: "thu",
      render: (value, item) => {
        return item.days.thu ? item.days.thu.subject.name : "";
      },
    },
    {
      title: "Friday",
      dataIndex: "fri",
      key: "fri",
      render: (value, item) => {
        return item.days.fri ? item.days.fri.subject.name : "";
      },
    },
  ];

  const tableData = prepareScheduleTable(data, callsSchedule)?.map((t) => {
    return {
      ...t,
      key: t.id,
    };
  });

  console.log(tableData);

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
              <Link to={generatePath(routes.adminClassSchedulePage, { id })}>
                Schedule
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classData.level}-${classData.section}`} class schedule
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button
          type="primary"
          style={{ backgroundColor: "green" }}
          onClick={() => {}}
          disabled
        >
          Smth
        </Button>
      </div>
      <Table columns={tableColumns} dataSource={tableData} pagination={false} />
    </div>
  );
}

export default ClassSchedulePage;
