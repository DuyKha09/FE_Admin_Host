import React from "react";
import { Flex, Typography, Avatar } from "antd";
import {
  MessageOutlined,
  NotificationOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Search from "antd/es/input/Search";
import { LocalStorage } from "../../utils/LocalStorage";

const CustomHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
    toast.success("Logout successful");
    LocalStorage.clearToken();
  };

  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={3} type="secondary">
        WelCome Fur Ever Friend
      </Typography.Title>
      <Flex align="center" gap="3rem" >
        <Search placeholder="Search DashBoard" allowClear />
        <Flex align="center" gap="10px">
          <MessageOutlined className="header-icon" />
          <NotificationOutlined className="header-icon" />
          <LogoutOutlined onClick={handleLogout} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
