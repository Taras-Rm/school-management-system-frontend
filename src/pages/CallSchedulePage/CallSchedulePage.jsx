import React, { useContext } from "react";
import { routes } from "../routes";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, Button, Table, Typography, message } from "antd";
import { getSchoolCallsSchedule } from "../../api/callsSchedule";
import { useQuery } from "react-query";
import { formatTime } from "../../utils/date";
import UserContext from "../../user-context";
import { useTranslation } from "react-i18next";

function CallSchedulePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
    });
  const tableColumns = [
    {
      title: t("tables.number"),
      dataIndex: "orderNumber",
      key: "orderNumber",
      align: "center",
      width: "30%",
      render: (value, item) => {
        return <Typography.Text strong>{value}</Typography.Text>;
      },
    },
    {
      title: t("tables.time"),
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (value, item) => {
        return item.startTime && item.endTime
          ? `${formatTime(new Date(item.startTime))} - ${formatTime(
              new Date(item.endTime)
            )}`
          : "";
      },
    },
  ];

  const tableData = callsSchedule.map((cS) => {
    return {
      ...cS,
      key: cS.id,
    };
  });

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
              <Link to={routes.callSchedulePage}>
                {t("pages.callsSchedule.breadcrumb.callsSchedule")}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {t("pages.callsSchedule.title")}
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        {user.role === "admin" && (
          <Button
            type="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => navigate(routes.editCallSchedulePage)}
          >
            {t("pages.callsSchedule.editCallsScheduleBtn")}
          </Button>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Table
          loading={isCallScheduleLoading}
          style={{ width: "50%" }}
          dataSource={tableData}
          columns={tableColumns}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  );
}

export default CallSchedulePage;
