import { Card, Typography } from "antd";
import React from "react";
import { generatePath } from "react-router";
import { routes } from "../../routes";

function JournalCard({ journalInfo }) {
  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography.Text style={{ fontSize: 18 }}>
            {`${journalInfo.class.level}-${journalInfo.class.section}`}
          </Typography.Text>
          <Typography.Link
            href={generatePath(routes.journalPage, { id: journalInfo.id })}
            style={{ fontSize: 18 }}
          >
            {`${journalInfo.classSubject.subject.name}`}
          </Typography.Link>
        </div>
      }
      actions={[]}
      bordered={false}
    >
      <div>
        <Typography.Text>Teacher: </Typography.Text>
        {journalInfo.classSubject.teacher ? (
          <Typography.Text
            strong
          >{`${journalInfo.classSubject.teacher.name} ${journalInfo.classSubject.teacher.surname}`}</Typography.Text>
        ) : (
          <Typography.Text>not defined</Typography.Text>
        )}
      </div>
    </Card>
  );
}

export default JournalCard;
