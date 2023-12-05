import { Breadcrumb, Spin, Typography, message } from "antd";
import React, { useContext } from "react";
import { Link, generatePath, useParams } from "react-router-dom";
import { routes } from "../routes";
import { useQuery } from "react-query";
import { getSchoolClass } from "../../api/classes";
import ClassJournalTable from "../../components/ClassJournalTable/ClassJournalTable";
import UserContext from "../../user-context";
import {
  getJournal,
  getJournalColumns,
  getJournalStudentsGrades,
} from "../../api/journals";
import { useTranslation } from "react-i18next";
import { RETRY_COUNT } from "../../api/api";
import Loader from "../../components/Loader/Loader";

function ClassJournalPage() {
  const { t } = useTranslation();
  const { id, journalId } = useParams();

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

  const { data: classJournal, isLoading: isLoadingJournal } = useQuery(
    ["classes", id, "journals", journalId],
    () => getJournal({ id: journalId }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: journalColumns, isLoading: isLoadingJournalColumns } = useQuery(
    ["classes", id, "journals", journalId, "columns"],
    () => getJournalColumns({ id: journalId }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  const { data: journalGrades, isLoading: isLoadingJournalGrades } = useQuery(
    ["classes", id, "journals", journalId, "grades"],
    () => getJournalStudentsGrades({ id: journalId }),
    {
      onError: (error) => {
        message.error(error);
      },
      retry: RETRY_COUNT,
    }
  );

  if (
    isLoading ||
    isLoadingJournal ||
    isLoadingJournalColumns ||
    isLoadingJournalGrades
  )
    return <Loader />;

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
                {t("pages.classJournal.breadcrumb.classes")}
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
              <Link to={generatePath(routes.classJournalsPage, { id })}>
                {t("pages.classJournal.breadcrumb.journals")}
              </Link>
            ),
          },
          {
            title: (
              <Link
                to={generatePath(routes.classJournalPage, {
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
        {`${t("pages.classJournal.title")} - ${
          classJournal.classSubject.subject.name
        }`}
      </Typography.Title>
      <div style={{ marginBottom: 20, minHeight: 32 }}></div>
      <ClassJournalTable
        t={t}
        journalColumns={journalColumns}
        journalGrades={journalGrades}
        classId={id}
        journalId={journalId}
        disabled={user.id !== classJournal.classSubject.teacherId}
      />
    </div>
  );
}

export default ClassJournalPage;
