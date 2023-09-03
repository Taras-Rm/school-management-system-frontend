import React, { useState } from "react";
import { Layout as AntdLayout, Avatar, Button, Menu, Typography } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  ContactsOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { routes } from "../../pages/routes";

function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      "School",
      "1",
      <Link to={routes.adminSchoolPage}>
        <HomeOutlined />
      </Link>
    ),
    getItem(
      "Teachers",
      "2",
      <Link to={routes.adminTeachersPage}>
        <UserOutlined />
      </Link>
    ),
    getItem(
      "Students",
      "3",
      <Link to={routes.adminStudentsPage}>
        <ContactsOutlined />
      </Link>
    ),
  ];

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
            test@gmail.com
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
              defaultSelectedKeys={["1"]}
              items={items}
            />
          </AntdLayout.Sider>
          <Outlet />
        </AntdLayout>
      </AntdLayout>
    </div>
  );
}

export default Layout;
