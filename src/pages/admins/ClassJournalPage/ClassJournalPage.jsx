import { Breadcrumb, Spin, Table, Typography, message } from "antd";
import React from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../../routes";
import { useQuery } from "react-query";
import {
  getClassJournal,
  getClassJournalColumns,
  getClassJournalStudentsGrades,
  getSchoolClass,
} from "../../../api/classes";
import { prepareClassJournalTableColumns, prepareClassJournalTableData } from "./classJournalHelper";

function ClassJournalPage() {
  const { id, journalId } = useParams();

  const { data: classData, isLoading } = useQuery(
    ["classes", id],
    () => getSchoolClass({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: classJournal, isLoading: isLoadingJournal } = useQuery(
    ["classes", id, "journals", journalId],
    () => getClassJournal({ id, journalId }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: journalColumns, isLoading: isLoadingJournalColumns } = useQuery(
    ["classes", id, "journals", journalId, "columns"],
    () => getClassJournalColumns({ id, journalId }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const { data: journalGrades, isLoading: isLoadingJournalGrades } = useQuery(
    ["classes", id, "journals", journalId, "grades"],
    () => getClassJournalStudentsGrades({ id, journalId }),
    {
      onError: (error) => {
        message.error(error);
      },
    }
  );

  const tableColumns = prepareClassJournalTableColumns(journalColumns);

  const tableData = prepareClassJournalTableData(journalGrades);

  if (
    isLoading ||
    isLoadingJournal ||
    isLoadingJournalColumns ||
    isLoadingJournalGrades
  )
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
              <Link to={generatePath(routes.adminClassJournalsPage, { id })}>
                Journals
              </Link>
            ),
          },
          {
            title: (
              <Link
                to={generatePath(routes.adminClassJournalPage, {
                  id,
                  journalId,
                })}
              >
                {classJournal.classSubject.subject.name}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${classJournal.classSubject.subject.name}`} journal
      </Typography.Title>
      <div style={{ marginBottom: 20, minHeight: 32 }}></div>
      <Table
        columns={tableColumns}
        dataSource={tableData}
        scroll={{ x: tableColumns.length * 80 }}
        size="small"
        pagination={false}
        bordered
      />
    </div>
  );
}

export default ClassJournalPage;
