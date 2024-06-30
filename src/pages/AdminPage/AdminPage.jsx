import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { LocalStorage } from "../../utils/LocalStorage";
import { Sidebar } from "../../components/Admin/Sidebar";
import CustomHeader from "../../components/Admin/Header";
import "./App.css";

const { Sider, Header, Content } = Layout;

const AdminPage = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const role = LocalStorage.getRole();
    if (role !== "admin") {
      navigate("/forbidden");
      LocalStorage.clearToken();
    }
  }, [navigate]);

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
        width={220}
        collapsedWidth={80}
      >
        <Sidebar />

        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          className="triger-btn"
        />
      </Sider>
      <Layout className="layout-background">
        <Header className="headers">
          <CustomHeader />
        </Header>
        <Content className="content">
          <Flex gap="large">
            <Outlet />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
