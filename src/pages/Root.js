import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import SchoolPage from "./admins/SchoolPage/SchoolPage";
import { routes } from "./routes";
import TeachersPage from "./admins/TeachersPage/TeachersPage";
import StudentsPage from "./admins/StudentsPage/StudentsPage";
import LoginPage from "./common/LoginPage/LoginPage";
import NotFoundPage from "./common/NotFoundPage/NotFoundPage";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.loginPage} element={<LoginPage />} />
        <Route element={<Layout />}>
          <Route
            path={routes.adminSchoolPage}
            element={
              <PrivateRoute role={"admin"}>
                <SchoolPage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.adminTeachersPage}
            element={
              <PrivateRoute role={"admin"}>
                <TeachersPage />
              </PrivateRoute>
            }
          />
          <Route
            path={routes.adminStudentsPage}
            element={
              <PrivateRoute role={"admin"}>
                <StudentsPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Root;
