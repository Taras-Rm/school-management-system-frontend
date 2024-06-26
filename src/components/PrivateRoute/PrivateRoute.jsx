import React, { useContext } from "react";
import { useQuery } from "react-query";
import { me } from "../../api/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { routes } from "../../pages/routes";
import { Spin } from "antd";
import UserContext from "../../user-context";

function PrivateRoute({ children, roles }) {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["me"], me, {
    retry: false,
    onSuccess: (data) => {
      setUser(data)
      if (!roles.find((r) => r === data.role)) {
        navigate(routes.loginPage);
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
