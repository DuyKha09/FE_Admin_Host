import React, { useState } from "react";
import { Button, Flex, Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Sidebar } from "../../components/Admin/Sidebar";
import CustomHeader from "../../components/Admin/Header";
import "./App.css";
import MainContent from "../../components/Admin/MainContent";
import SideContent from "../../components/Admin/SideContent";
import background from "../../assets/background.jpg"; // Import hình nền

const { Sider, Header, Content } = Layout;

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
        width={260}
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
        <Header className="header">
          <CustomHeader />
        </Header>
        <Content className="content">
          <Flex gap="large">
            <MainContent />
            <SideContent />
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
