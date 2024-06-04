import { Flex, Menu } from "antd";
import React from "react";
import {
  UserOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SnippetsOutlined,
  BookOutlined,
  SolutionOutlined,
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
  getItem("Quản Lý Đơn Hàng", "2", <CarryOutOutlined />, [
    getItem("Đơn Hàng Hoàn Thành", "3", <SnippetsOutlined />),
    getItem("Đơn Hàng Đang Xử Lý", "4", <BookOutlined />),
  ]),
  getItem("Quản Lý Dịch Vụ", "5", <OrderedListOutlined />),
  getItem("Quản Lý Khiếu Nại", "6", <ProfileOutlined />),
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
        defaultSelectedKeys={["1"]}
        className="menu-bar"
        items={items}
        onClick={({ key }) => {
          navigate(key);
        }}
      ></Menu>
    </>
  );
};
