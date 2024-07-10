import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../api/customFetch";
import { baseURL, pets, users } from "../../../api/endPoints";
import { Table, Space, Typography, Avatar, Tag, Button } from "antd";
import {
  TeamOutlined,
  GooglePlusOutlined,
  PhoneOutlined,
  BaiduOutlined,
  UnlockOutlined,
  EyeOutlined,
  IssuesCloseOutlined
} from "@ant-design/icons";
import avatar from "../../../assets/avatar.jpg";

const { Column } = Table;
const { Title } = Typography;

const ManageCustomerAccount = () => {
  const [userPetCount, setUserPetCount] = useState([]);
  const navigate = useNavigate();

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

        const usersWithPetCount = userData
          .filter((user) => user.role.role_name === "customer")
          .map((user) => ({
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

  const handleViewDetails = (user_id) => {
    navigate(`/admin/manageCustomerAccount/${user_id.toString()}`);
  };

  return (
    <div style={{marginLeft: 30}}>
      <Title level={4} style={{ marginTop: -25}}>
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
          width={220}
          render={(full_name) => (
            <Space >
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
          width={180}
          
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
          width={170}
          align="center"
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
          width={150}
          align="center"
          render={(petCount) => (
            <Space style={{ justifyContent: "center", width: "100%" }}>
              {petCount} con
            </Space>
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
          width={160}
          align="center"
          render={(account_status) => (
            <Tag
              color={account_status ? "green" : "red"}
              style={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              {account_status ? "Đang hoạt động" : "Tài khoản đã bị cấm"}
            </Tag>
          )}
        />
        <Column
          title={
            <Space style={{ justifyContent: "center"}}>
              <IssuesCloseOutlined /> Hành Động
            </Space>
          }
          key="action"
          width={100}
          align="center"
          render={(text, user) => (
            <Space style={{ justifyContent: "center", width: "100%" }}>
              <Button
                type="primary"
                icon={<EyeOutlined />}
                onClick={() => handleViewDetails(user.user_id)}
                style={{fontSize: 11, background: "#97CADB"}}
              >
                Xem Chi Tiết
              </Button>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default ManageCustomerAccount;
