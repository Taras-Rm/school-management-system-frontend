import React, { useEffect, useMemo, useState } from "react";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Menu,
  Typography,
  message,
} from "antd";
import {
  UserOutlined,
  HomeOutlined,
  ContactsOutlined,
  LogoutOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../pages/routes";
import { logout, me } from "../../api/auth";
import { useMutation, useQuery } from "react-query";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);

  const [selecteMenuItem, setSelecteMenuItem] = useState(location.pathname);

  useEffect(() => {
    setSelecteMenuItem(location.pathname);
  }, [location]);

  const {
    data: user,
    isLoading,
    error,
  } = useQuery(["me"], me, {
    retry: false,
  });

  const logoutMutation = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem("authToken");
      navigate(`/login`);
    },
    onError: () => {
      message.error("Failed to logout");
    },
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  const items = useMemo(() => {
    let availableItems = [];
    if (user.role === "admin") {
      availableItems.push(
        getItem(
          "School",
          routes.adminSchoolPage,
          <Link to={routes.adminSchoolPage}>
            <HomeOutlined />
          </Link>
        )
      );
      if (user.schoolId) {
        availableItems.push(
          getItem(
            "Teachers",
            routes.adminTeachersPage,
            <Link to={routes.adminTeachersPage}>
              <UserOutlined />
            </Link>
          ),
          getItem(
            "Students",
            routes.adminStudentsPage,
            <Link to={routes.adminStudentsPage}>
              <ContactsOutlined />
            </Link>
          ),
          getItem(
            "Classes",
            routes.adminClassesPage,
            <Link to={routes.adminClassesPage}>
              <BlockOutlined />
            </Link>
          )
        );
      }
    } else if (user.role === "teacher") {
      availableItems.push(
        getItem(
          "School",
          routes.teacherSchoolPage,
          <Link to={routes.teacherSchoolPage}>
            <HomeOutlined />
          </Link>
        )
      );
    }
    return availableItems;
  }, [user.role, user.schoolId]);

  return (
    <div>
      <AntdLayout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Typography.Text style={{ color: "white" }}>
            {user?.email}
          </Typography.Text>
          <Avatar
            size={"large"}
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#5b5959",
              marginLeft: 20,
            }}
          />
          <Button
            style={{ marginLeft: 20 }}
            shape="circle"
            icon={<LogoutOutlined />}
            onClick={() => handleLogout()}
          />
        </Header>
        <AntdLayout hasSider>
          <AntdLayout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selecteMenuItem]}
              items={items}
              onClick={(e) => setSelecteMenuItem(e.key)}
            />
          </AntdLayout.Sider>
          <Outlet />
        </AntdLayout>
      </AntdLayout>
    </div>
  );
}

export default Layout;
