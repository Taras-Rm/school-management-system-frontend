import { Breadcrumb, Spin, Typography, message } from "antd";
import React, { useContext } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useQuery } from "react-query";
import ClassJournalTable from "../../components/ClassJournalTable/ClassJournalTable";
import UserContext from "../../user-context";
import {
  getJournal,
  getJournalColumns,
  getJournalStudentsGrades,
} from "../../api/journals";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";

function JournalPage() {
  const { t } = useTranslation();
  const { id } = useParams();

  const { user } = useContext(UserContext);

  const { data: journal, isLoading: isLoadingJournal } = useQuery(
    ["journals", id],
    () => getJournal({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: journalColumns, isLoading: isLoadingJournalColumns } = useQuery(
    ["journals", id, "columns"],
    () => getJournalColumns({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!journal,
      retry: RETRY_COUNT,
    }
  );

  const { data: journalGrades, isLoading: isLoadingJournalGrades } = useQuery(
    ["journals", id, "grades"],
    () => getJournalStudentsGrades({ id }),
    {
      onError: (error) => {
        message.error(error);
      },
      enabled: !!journal,
      retry: RETRY_COUNT
    }
  );

  if (isLoadingJournal || isLoadingJournalColumns || isLoadingJournalGrades)
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
              <Link to={routes.journalsPage}>
                {t("pages.journals.breadcrumb.journals")}
              </Link>
            ),
          },
          {
            title: (
              <Link to={generatePath(routes.journalPage, { id })}>
                {`${journal.class.level}-${journal.class.section} ${journal.classSubject.subject.name}`}
              </Link>
            ),
          },
        ]}
      />
      <Typography.Title level={2} style={{ margin: "15px 0" }}>
        {`${journal.classSubject.subject.name}`}
      </Typography.Title>
      <div style={{ marginBottom: 20, minHeight: 32 }}></div>
      <ClassJournalTable
        t={t}
        journalColumns={journalColumns}
        journalGrades={journalGrades}
        classId={journal.classId}
        journalId={id}
        disabled={user.id !== journal.classSubject.teacherId}
      />
    </div>
  );
}

export default JournalPage;
