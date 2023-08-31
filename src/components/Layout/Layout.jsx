import React, { useState } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
  ContactsOutlined,
  BookOutlined,
  SketchOutlined,
} from "@ant-design/icons";
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
    getItem("School", "1", <HomeOutlined />),
    getItem("Teachers", "2", <UserOutlined />),
    getItem("Students", "3", <ContactsOutlined />),
    getItem("Subjects", "4", <BookOutlined />),
  ];

  return (
    <div>
      <AntdLayout style={{ minHeight: "100vh" }}>
        <AntdLayout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div style={{ marginTop: 20 }}></div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </AntdLayout.Sider>
      </AntdLayout>
    </div>
  );
}

export default Layout;
