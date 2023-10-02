import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import AdminSchoolPage from "./admins/SchoolPage/SchoolPage";
import { routes } from "./routes";
import TeachersPage from "./admins/TeachersPage/TeachersPage";
import StudentsPage from "./admins/StudentsPage/StudentsPage";
import LoginPage from "./common/LoginPage/LoginPage";
import NotFoundPage from "./common/NotFoundPage/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import TeacherSchoolPage from "./techers/SchoolPage/SchoolPage";
import ClassesPage from "./admins/ClassesPage/ClassesPage";
import ClassPage from "./admins/ClassPage/ClassPage";
import EditClassPage from "./admins/EditClassPage/EditClassPage";
import StudentPage from "./admins/StudentPage/StudentPage";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.loginPage} element={<LoginPage />} />
        <Route
          element={
            <PrivateRoute role={"admin"}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route path={routes.adminSchoolPage} element={<AdminSchoolPage />} />
          <Route path={routes.adminTeachersPage} element={<TeachersPage />} />
          <Route path={routes.adminStudentsPage} element={<StudentsPage />} />
          <Route path={routes.adminStudentPage} element={<StudentPage />} />
          <Route path={routes.adminClassesPage} element={<ClassesPage />} />
          <Route path={routes.adminClassPage} element={<ClassPage />} />
          <Route path={routes.adminEditClassPage} element={<EditClassPage />} />
        </Route>
        <Route
          element={
            <PrivateRoute role={"teacher"}>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route
            path={routes.teacherSchoolPage}
            element={<TeacherSchoolPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
