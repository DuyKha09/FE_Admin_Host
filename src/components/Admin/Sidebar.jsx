import { Flex, Menu } from "antd";
import React from "react";
import { FaLeaf } from "react-icons/fa6";
import {
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const Sidebar = () => {
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <FaLeaf />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        items={[
          { key: "1", icon: <UserOutlined />, label: "DashBoard" },
          { key: "2", icon: <ProfileOutlined />, label: "Profile" },
          { key: "3", icon: <CarryOutOutlined />, label: "My Orders" },
          { key: "4", icon: <OrderedListOutlined />, label: "To Do" },
          { key: "5", icon: <SettingOutlined />, label: "Setting" },
          { key: "6", icon: <LogoutOutlined />, label: "Logout" },
        ]}
      ></Menu>
    </>
  );
};
