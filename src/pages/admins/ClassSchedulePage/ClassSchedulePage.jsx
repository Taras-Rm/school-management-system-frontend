import { Breadcrumb, Button, Spin, Table, Typography, message } from "antd";
import React from "react";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "react-query";
import { getClassSchedule, getSchoolClass } from "../../../api/classes";
import { getSchoolCallsSchedule } from "../../../api/callsSchedule";
import { prepareScheduleTable } from "./classScheduleHelper";
import { formatTime } from "../../../utils/date";

function ClassSchedulePage() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const { data: classSchedule = [], isLoading: isClassScheduleLoading } =
    useQuery(
      ["classes", id, "schedule"],
      () => getClassSchedule({ classId: id }),
      {
        onError: (error) => {
          message.error(error);
        },
      }
    );

  const getCellContent = (day) => {
    return (
      <div>
        {day ? (
          <div>
            {day.subject.name}
            <br />
            {day.teacher && (
              <Typography.Text style={{ size: 12 }} type="secondary">
                {`${day.teacher.name} ${day.teacher.surname}`}
              </Typography.Text>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const tableColumns = [
    {
      title: "#",
      dataIndex: "orderNumber",
      key: "orderNumber",
      align: "center",
      render: (value, item) => {
        return value;
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      align: "center",
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
        return getCellContent(item.days.mon);
      },
    },
    {
      title: "Tuesday",
      dataIndex: "tue",
      key: "tue",
      render: (value, item) => {
        return getCellContent(item.days.tue);
      },
    },
    {
      title: "Wednesday",
      dataIndex: "wed",
      key: "wed",
      render: (value, item) => {
        return getCellContent(item.days.wed);
      },
    },
    {
      title: "Thursday",
      dataIndex: "thu",
      key: "thu",
      render: (value, item) => {
        return getCellContent(item.days.thu);
      },
    },
    {
      title: "Friday",
      dataIndex: "fri",
      key: "fri",
      render: (value, item) => {
        return getCellContent(item.days.fri);
      },
    },
  ];

  const tableData = prepareScheduleTable(classSchedule, callsSchedule)?.map(
    (t) => {
      return {
        ...t,
        key: t.id,
      };
    }
  );

  if (isLoading || isClassScheduleLoading || isCallScheduleLoading)
    return <Spin spinning />;

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
          onClick={() =>
            navigate(generatePath(routes.adminEditClassSchedulePage, { id }))
          }
        >
          Edit
        </Button>
      </div>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        pagination={false}
        bordered
      />
    </div>
  );
}

export default ClassSchedulePage;
