import React from "react";
import { useQuery } from "react-query";
import { me } from "../../api/auth";
import { Navigate } from "react-router-dom";
import { routes } from "../../pages/routes";
import { Spin } from "antd";

function PrivateRoute({ children, role }) {
  const {
    isLoading,
    error,
  } = useQuery(["me"], me, {
    retry: false,
    onSuccess: (data) => {
      if (data.role != role) {
        return <Navigate to={routes.loginPage} />;
      }
    },
  });

  if (isLoading) {
    <Spin spinning />;
  }

  if (error) {
    return <Navigate to={routes.loginPage} />;
  }

  return <div>{children}</div>;
}

export default PrivateRoute;
