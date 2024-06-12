import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/customFetch";
import { baseURL, users } from "../../../api/endPoints";
import { Table, Space, Typography, Avatar, Tag } from "antd";
import {
  TeamOutlined,
  GooglePlusOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import avatar from "../../../assets/avatar.jpg";

const { Column } = Table;
const { Title } = Typography;

const ManageAccount = () => {
  const [userData, setUserData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get(baseURL + users);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      <Title level={4} style={{ marginTop: -25 }}>
        Quản Lý Tài Khoản
      </Title>
      <Table
        dataSource={userData}
        scroll={{ x: "max-content" }}
        style={{
          borderColor: "1px solid #ccc",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          background: "white",
        }}
        pagination={{ pageSize: 7 }}
      >
        <Column
          title={
            <Space>
              <TeamOutlined /> Tên Khách Hàng
            </Space>
          }
          dataIndex="full_name"
          key="full_name"
          ellipsis={{ showTitle: false }}
          width={200}
          render={(full_name) => (
            <Space>
              <Avatar src={avatar} />
              {full_name}
            </Space>
          )}
        />
        <Column
          title={
            <Space>
              <GooglePlusOutlined /> Email
            </Space>
          }
          dataIndex="email"
          key="email"
          ellipsis={{ showTitle: false }}
          width={200}
        />
        <Column
          title={
            <Space>
              <PhoneOutlined /> Số Điện Thoại
            </Space>
          }
          dataIndex="phone_number"
          key="phone_number"
          ellipsis={{ showTitle: false }}
          width={200}
        />
        <Column
          title={
            <Space>
              <UserSwitchOutlined /> Vai trò
            </Space>
          }
          dataIndex="role"
          key="role"
          ellipsis={{ showTitle: false }}
          width={200}
          render={(role) => (
            <Tag color={role.role_name === "customer" ? "blue" : "yellow"}>
              {role.role_name}
            </Tag>
          )}
        />
        <Column
          title={
            <Space>
              <UnlockOutlined /> Hoạt Động
            </Space>
          }
          dataIndex="account_status"
          key="account_status"
          ellipsis={{ showTitle: false }}
          width={200}
          render={(account_status) => (
            <Tag color={account_status ? "green" : "red"}>
              {account_status ? "Hoạt Động" : "Đã Bị Ban"}
            </Tag>
          )}
        />
      </Table>
    </div>
  );
};

export default ManageAccount;
