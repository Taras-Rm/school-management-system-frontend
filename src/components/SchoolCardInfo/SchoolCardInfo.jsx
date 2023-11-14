import { Card, Typography } from "antd";
import React from "react";

function SchoolCardInfo({ t, title, count }) {
  return (
    <Card
      title={
        <Typography.Text type="secondary" style={{ fontSize: 18 }}>
          {title}
        </Typography.Text>
      }
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {(count || count == 0) && (
          <>
            <Typography.Text style={{ fontSize: 26 }}>
              {" "}
              {t("common.count")}:
            </Typography.Text>
            <Typography.Text style={{ fontSize: 26 }}>{count}</Typography.Text>
          </>
        )}
      </div>
    </Card>
  );
}

export default SchoolCardInfo;
