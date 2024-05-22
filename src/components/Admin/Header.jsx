import React from "react";
import { Flex, Typography, Avatar } from "antd";
import {
  MessageOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Search from "antd/es/input/Search";

const CustomHeader = () => {
  return (
    <Flex align="center" justify="space-between">
      <Typography.Title level={3} type="secondary">
        WelCome Fur Ever Friend
      </Typography.Title>
      <Flex align="center" gap="3rem">
        <Search placeholder="Search DashBoard" allowClear />
        <Flex align="center" gap="10px">
          <MessageOutlined className="header-icon"/>
          <NotificationOutlined className="header-icon"/>
          <Avatar icon={<UserOutlined />} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CustomHeader;
