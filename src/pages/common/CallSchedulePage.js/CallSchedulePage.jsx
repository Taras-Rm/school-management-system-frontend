import React from "react";
import { routes } from "../../routes";
import { Link } from "react-router-dom";
import { Breadcrumb, Button, Table, Typography, message } from "antd";
import { getSchoolCallsSchedule } from "../../../api/callsSchedule";
import { useQuery } from "react-query";
import { formatTime } from "../../../utils/date";

function CallSchedulePage() {
  const { data: callsSchedule = [], isLoading: isCallScheduleLoading } =
    useQuery(["callsSchedule"], getSchoolCallsSchedule, {
      onError: (error) => {
        message.error(error);
      },
    });
  const tableColumns = [
    {
      title: "Lesson",
      dataIndex: "orderNumber",
      key: "orderNumber",
      align: "center",
      width: "30%",
      render: (value, item) => {
        return <Typography.Text strong>{value}</Typography.Text>;
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
  ];

  const tableData = callsSchedule?.map((t) => {
    return {
      ...t,
      key: t.id,
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
            title: <Link to={routes.adminSchedulePage}>Schedule</Link>,
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        Schedule
      </Typography.Title>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" style={{ backgroundColor: "green" }}>
          Edit schedule
        </Button>
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
