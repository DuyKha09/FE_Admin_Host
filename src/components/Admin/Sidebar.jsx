import { Flex, Menu } from "antd";
import React from "react";
import {
  UserOutlined,
  ProfileOutlined,
  OrderedListOutlined,
  CarryOutOutlined,
  SnippetsOutlined,
  BookOutlined,
} from "@ant-design/icons";
import avatar from "../../assets/avatar.jpg";

export const Sidebar = () => {
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
        items={[
          { key: "1", icon: <UserOutlined />, label: "Quản Lý Tài Khoản" },

          {
            key: "2",
            icon: <CarryOutOutlined />,
            label: "Quản Lý Đơn Hàng",
            children: [
              {
                key: "3",
                icon: <SnippetsOutlined />,
                label: "Đơn Hàng Hoàn Thành",
              },

              {
                key: "4",
                icon: <BookOutlined />,
                label: "Đơn Hàng Đang Xử Lý",
              },
            ],
          },
          { key: "5", icon: <OrderedListOutlined />, label: "Quản Lý Dịch Vụ" },
          { key: "6", icon: <ProfileOutlined />, label: "Quản Lý Khiếu Nại" },
        ]}
      ></Menu>
    </>
  );
};
