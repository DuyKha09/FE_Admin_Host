import { Flex, Menu } from "antd";
import React from "react";
import {
  UserOutlined,
  ProfileOutlined,
  SolutionOutlined,
  LineChartOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import avatar from "../../assets/avatar.jpg";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Quản Lý Tài Khoản", "manageAccount", <UserOutlined />),
  getItem("Quản Lý Khách Hàng", "manageCustomerAccount", <SolutionOutlined />),
  getItem("Quản Lý Dịch Vụ", "manageService", <SlidersOutlined />),
];

export const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex align="center" justify="center">
        <div className="logo">
          <img
            src={avatar}
            style={{ width: "80px", marginTop: 10 }}
            alt="Avatar"
          />
        </div>
      </Flex>
      <Menu
        mode="inline"
        defaultSelectedKeys={["manageAccount"]}
        className="menu-bar"
        items={items}
        onClick={({ key }) => {
          navigate(key);
        }}
      ></Menu>
    </>
  );
};
