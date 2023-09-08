import React from "react";
import { useQuery } from "react-query";
import { me } from "../../api/auth";
import { Navigate } from "react-router-dom";
import { routes } from "../../pages/routes";
import { Spin } from "antd";

function PrivateRoute({ children, role }) {
  const {
    data: user,
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

  if (user) {
    return <>{children}</>;
  }
}

export default PrivateRoute;
