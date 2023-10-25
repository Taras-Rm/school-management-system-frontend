import { Card, Typography } from "antd";
import React from "react";
import { generatePath } from "react-router";

function JournalCard({ journalInfo }) {
  return (
    <Card
      title={
        <Typography.Link
          href={generatePath("sa", { id: journalInfo.id })}
          style={{ fontSize: 18 }}
        >
          {`${journalInfo.classSubject.subject.name}`}
        </Typography.Link>
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
