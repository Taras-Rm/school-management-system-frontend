import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SchoolPage from "./SchoolPage/SchoolPage";
import { routes } from "./routes";
import TeachersPage from "./TeachersPage/TeachersPage";
import StudentsPage from "./StudentsPage/StudentsPage";
import LoginPage from "./LoginPage/LoginPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import ClassesPage from "./ClassesPage/ClassesPage";
import ClassPage from "./ClassPage/ClassPage";
import SubjectsPage from "./SubjectsPage/SubjectsPage";
import EditSchoolPage from "./EditSchoolPage/EditSchoolPage";
import CallSchedulePage from "./CallSchedulePage/CallSchedulePage";
import ClassSubjects from "./ClassSubjectsPage/ClassSubjectsPage";
import ClassSchedulePage from "./ClassSchedulePage/ClassSchedulePage";
import EditClassSchedulePage from "./EditClassSchedulePage/EditClassSchedulePage";
import EditCallSchedulePage from "./EditCallSchedulePage/EditCallSchedulePage";
import ClassJournalsPage from "./ClassJournalsPage/ClassJournalsPage";
import ClassJournalPage from "./ClassJournalPage/ClassJournalPage";
import FirstPage from "./FirstPage/FirstPage";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.loginPage} element={<LoginPage />} />
        <Route path={routes.firstPage} element={<FirstPage />} />

        <Route
          element={
            <PrivateRoute roles={["admin", "teacher"]}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path={routes.schoolPage} element={<SchoolPage />} />
          <Route path={routes.editSchoolPage} element={<EditSchoolPage />} />

          <Route path={routes.teachersPage} element={<TeachersPage />} />
          <Route path={routes.studentsPage} element={<StudentsPage />} />
          <Route path={routes.classesPage} element={<ClassesPage />} />
          <Route path={routes.classPage} element={<ClassPage />} />
          <Route path={routes.subjectsPage} element={<SubjectsPage />} />
          <Route
            path={routes.callSchedulePage}
            element={<CallSchedulePage />}
          />
          <Route
            path={routes.editCallSchedulePage}
            element={<EditCallSchedulePage />}
          />

          <Route path={routes.classSubjectsPage} element={<ClassSubjects />} />
          <Route
            path={routes.classSchedulePage}
            element={<ClassSchedulePage />}
          />
          <Route
            path={routes.editClassSchedulePage}
            element={<EditClassSchedulePage />}
          />
          <Route
            path={routes.classJournalsPage}
            element={<ClassJournalsPage />}
          />
          <Route
            path={routes.classJournalPage}
            element={<ClassJournalPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
