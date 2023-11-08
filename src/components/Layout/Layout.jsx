import React, { useContext, useEffect, useMemo, useState } from "react";
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
  ScheduleOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { routes } from "../../pages/routes";
import { logout, me } from "../../api/auth";
import { useMutation, useQuery } from "react-query";
import UserContext from "../../user-context";

const menuOptionsRoutes = [
  routes.schoolPage,
  routes.teachersPage,
  routes.studentsPage,
  routes.classesPage,
  routes.subjectsPage,
  routes.callSchedulePage,
];

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);

  const [selecteMenuItem, setSelecteMenuItem] = useState(location.pathname);

  useEffect(() => {
    let path = location.pathname;
    for (const p of menuOptionsRoutes) {
      path = location.pathname.startsWith(p) ? p : path;
    }
    setSelecteMenuItem(path);
  }, [location]);

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
          routes.schoolPage,
          <Link to={routes.schoolPage}>
            <HomeOutlined />
          </Link>
        )
      );
      if (user.schoolId) {
        availableItems.push(
          getItem(
            "Teachers",
            routes.teachersPage,
            <Link to={routes.teachersPage}>
              <UserOutlined />
            </Link>
          ),
          getItem(
            "Students",
            routes.studentsPage,
            <Link to={routes.studentsPage}>
              <ContactsOutlined />
            </Link>
          ),
          getItem(
            "Classes",
            routes.classesPage,
            <Link to={routes.classesPage}>
              <BlockOutlined />
            </Link>
          ),
          getItem(
            "Subjects",
            routes.subjectsPage,
            <Link to={routes.subjectsPage}>
              <BlockOutlined />
            </Link>
          ),
          getItem(
            "Schedule",
            routes.callSchedulePage,
            <Link to={routes.callSchedulePage}>
              <ScheduleOutlined />
            </Link>
          )
        );
      }
    } else if (user.role === "teacher") {
      availableItems.push(
        getItem(
          "School",
          routes.schoolPage,
          <Link to={routes.schoolPage}>
            <HomeOutlined />
          </Link>
        ),
        getItem(
          "Teachers",
          routes.teachersPage,
          <Link to={routes.teachersPage}>
            <UserOutlined />
          </Link>
        ),
        getItem(
          "Students",
          routes.studentsPage,
          <Link to={routes.studentsPage}>
            <ContactsOutlined />
          </Link>
        ),
        getItem(
          "Subjects",
          routes.subjectsPage,
          <Link to={routes.subjectsPage}>
            <BlockOutlined />
          </Link>
        ),
        getItem(
          "Schedule",
          routes.callSchedulePage,
          <Link to={routes.callSchedulePage}>
            <ScheduleOutlined />
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
            height: 70,
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
        <AntdLayout
          hasSider
          style={{
            marginLeft: 200,
          }}
        >
          <AntdLayout.Sider
            style={{
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              marginTop: 70,
            }}
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
