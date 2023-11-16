import { Card, Typography } from "antd";
import React from "react";
import { generatePath } from "react-router";
import { routes } from "../../routes";

function JournalCard({ t, journalInfo, classId }) {
  return (
    <Card
      title={
        <Typography.Link
          href={generatePath(routes.classJournalPage, {
            id: classId,
            journalId: journalInfo.id,
          })}
          style={{ fontSize: 18 }}
        >
          {`${journalInfo.classSubject.subject.name}`}
        </Typography.Link>
      }
      actions={[]}
      bordered={false}
    >
      <div>
        <Typography.Text>{t("pages.classJournals.teacher")}: </Typography.Text>
        {journalInfo.classSubject.teacher ? (
          <Typography.Text
            strong
          >{`${journalInfo.classSubject.teacher.name} ${journalInfo.classSubject.teacher.surname}`}</Typography.Text>
        ) : (
          <Typography.Text>{t("common.notDefined")}</Typography.Text>
        )}
      </div>
    </Card>
  );
}

export default JournalCard;
