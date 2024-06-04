import React, { useEffect, useState } from "react";
import axiosClient from "../../api/customFetch";
import { baseURL, pets, users } from "../../api/endPoints";
import { Table, Space, Typography, Avatar, Tag } from "antd";
import {
  TeamOutlined,
  GooglePlusOutlined,
  PhoneOutlined,
  BaiduOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import avatar from "../../assets/avatar.jpg";

const { Column } = Table;
const { Title } = Typography;

const ManageCustomerAccount = () => {
  const [userPetCount, setUserPetCount] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get(baseURL + users);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const fetchPetData = async () => {
    try {
      const response = await axiosClient.get(baseURL + pets);
      return response.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, petData] = await Promise.all([
          fetchUserData(),
          fetchPetData(),
        ]);

        const petCount = petData.reduce((acc, pet) => {
          acc[pet.user_id] = (acc[pet.user_id] || 0) + 1;
          return acc;
        }, {});

        const usersWithPetCount = userData.map((user) => ({
          ...user,
          petCount: petCount[user.user_id] || 0,
        }));

        setUserPetCount(usersWithPetCount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title level={4} style={{ marginTop: -25 }}>
        Quản Lý Tài Khoản Khách Hàng
      </Title>
      <Table
        dataSource={userPetCount}
        scroll={{ x: "max-content" }}
        style={{
          borderColor: "1px solid #ccc",
          boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.15)",
          background: "white",
        }}
        pagination={{ pageSize: 7 }}
        rowKey="id"
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
              <BaiduOutlined /> Số Lượng Pet
            </Space>
          }
          dataIndex="petCount"
          key="petCount"
          ellipsis={{ showTitle: false }}
          width={200}
          render={(petCount) => <Space>{petCount} con</Space>}
        />
        <Column
          title={
            <Space>
              <UnlockOutlined /> Hoạt Động
            </Space>
          }
          dataIndex="status"
          key="status"
          ellipsis={{ showTitle: false }}
          width={200}
          render={(active) => (
            <Tag color={active ? "green" : "red"}>
              {active ? "Hoạt Động" : "Đã Bị Ban"}
            </Tag>
          )}
        />
      </Table>
    </div>
  );
};

export default ManageCustomerAccount;
