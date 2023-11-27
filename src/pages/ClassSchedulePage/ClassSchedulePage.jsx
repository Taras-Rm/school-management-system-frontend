import { Breadcrumb, Button, Spin, Table, Typography, message } from "antd";
import React from "react";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useQuery } from "react-query";
import { getClassSchedule, getSchoolClass } from "../../api/classes";
import { getSchoolCallsSchedule } from "../../api/callsSchedule";
import { prepareScheduleTable } from "./classScheduleHelper";
import { formatTime } from "../../utils/date";
import { useContext } from "react";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";

function ClassSchedulePage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    });

  const { data: classSchedule = [], isLoading: isClassScheduleLoading } =
    useQuery(
      ["classes", id, "schedule"],
      () => getClassSchedule({ classId: id }),
      {
        onError: (error) => {
          message.error(error);
        },
        retry: RETRY_COUNT,
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
      title: t("tables.time"),
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
      title: t("days.monday"),
      dataIndex: "mon",
      key: "mon",
      render: (value, item) => {
        return getCellContent(item.days.mon);
      },
    },
    {
      title: t("days.tuesday"),
      dataIndex: "tue",
      key: "tue",
      render: (value, item) => {
        return getCellContent(item.days.tue);
      },
    },
    {
      title: t("days.wednesday"),
      dataIndex: "wed",
      key: "wed",
      render: (value, item) => {
        return getCellContent(item.days.wed);
      },
    },
    {
      title: t("days.thursday"),
      dataIndex: "thu",
      key: "thu",
      render: (value, item) => {
        return getCellContent(item.days.thu);
      },
    },
    {
      title: t("days.friday"),
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
            title: (
              <Link to={routes.classesPage}>
                {t("pages.classSchedule.breadcrumb.classes")}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classPage, { id })}>
                {`${classData.level}-${classData.section}`}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.classSchedulePage, { id })}>
                {t("pages.classSchedule.breadcrumb.schedule")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classData.level}-${classData.section}`}{" "}
        {t("pages.classSchedule.title")}
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() =>
              navigate(generatePath(routes.editClassSchedulePage, { id }))
            }
          >
            {t("pages.classSchedule.editSheduleBtn")}
          </Button>
        )}
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
