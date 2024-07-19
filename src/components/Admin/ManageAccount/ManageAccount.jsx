import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/customFetch";
import { baseURL, updateAccountStatus, users } from "../../../api/endPoints";
import { Table, Space, Typography, Avatar, Tag, Button, Modal } from "antd";
import {
  TeamOutlined,
  GooglePlusOutlined,
  PhoneOutlined,
  UserSwitchOutlined,
  UnlockOutlined,
  IssuesCloseOutlined,
  DashOutlined,
} from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import avatar from "../../../assets/avatar.jpg";
import "./ManageAccount.css"; // Import CSS file

const { Column } = Table;
const { Title } = Typography;

const ManageAccount = () => {
  const [userData, setUserData] = useState([]);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [confirmUserId, setConfirmUserId] = useState(null);
  const [confirmUserStatus, setConfirmUserStatus] = useState(null);
  const [hoveredUserId, setHoveredUserId] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axiosClient.get(baseURL + users);
      console.log(response);
      setUserData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const showConfirmModal = (userId, status) => {
    setConfirmUserId(userId);
    setConfirmUserStatus(status);
    setConfirmModalVisible(true);
  };

  const handleConfirmChangeStatus = () => {
    updateUserStatus(confirmUserId, confirmUserStatus);
    setConfirmModalVisible(false);
  };

  const updateUserStatus = async (userId, status) => {
    try {
      await axiosClient.patch(`${baseURL}${updateAccountStatus}/${userId}`, {
        account_status: status,
      });
      setUserData((prevData) =>
        prevData.map((user) =>
          user.user_id === userId ? { ...user, account_status: status } : user
        )
      );
      toast.success("Cập nhật trạng thái tài khoản thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật trạng thái tài khoản.");
      console.log(error);
    }
  };

  return (
    <div style={{ marginLeft: 30 }}>
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
          textAlign: "center",
        }}
        pagination={{ pageSize: 7 }}
      >
        <Column
          title={
            <Space style={{ justifyContent: "center" }}>
              <TeamOutlined /> Tên Khách Hàng
            </Space>
          }
          dataIndex="full_name"
          key="full_name"
          ellipsis={{ showTitle: false }}
          width={200}
          render={(full_name) => (
            <Space style={{ justifyContent: "center" }}>
              <Avatar src={avatar} />
              {full_name}
            </Space>
          )}
        />
        <Column
          title={
            <Space style={{ justifyContent: "center" }}>
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
            <Space style={{ justifyContent: "center" }}>
              <PhoneOutlined /> Số Điện Thoại
            </Space>
          }
          dataIndex="phone_number"
          key="phone_number"
          ellipsis={{ showTitle: false }}
          width={170}
        />
        <Column
          title={
            <Space style={{ justifyContent: "center" }}>
              <UserSwitchOutlined /> Vai trò
            </Space>
          }
          dataIndex="role"
          key="role"
          ellipsis={{ showTitle: false }}
          width={120}
          render={(role) => (
            <Tag
              color={role.role_name === "customer" ? "blue" : "yellow"}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {role.role_name}
            </Tag>
          )}
        />
        <Column
          title={
            <Space style={{ justifyContent: "center" }}>
              <UnlockOutlined /> Hoạt Động
            </Space>
          }
          dataIndex="account_status"
          key="account_status"
          ellipsis={{ showTitle: false }}
          width={160}
          render={(account_status) => (
            <Tag
              color={account_status ? "green" : "red"}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {account_status ? "Đang hoạt động" : "Tài khoản đã bị cấm"}
            </Tag>
          )}
        />
        <Column
          title={
            <Space style={{ justifyContent: "center", marginLeft: 5 }}>
              <IssuesCloseOutlined /> Hành Động
            </Space>
          }
          key="action"
          ellipsis={{ showTitle: false }}
          width={120}
          render={(text, record) => (
            <Space
              size="middle"
              style={{ justifyContent: "center", position: "relative" }}
              onMouseEnter={() => setHoveredUserId(record.user_id)}
              onMouseLeave={() => setHoveredUserId(null)}
            >
              {hoveredUserId === record.user_id ? (
                <div className="action-buttons visible">
                  {record.account_status ? (
                    <Button
                      style={{
                        background: "red",
                        color: "white",
                        fontSize: 12,
                      }}
                      onClick={() => showConfirmModal(record.user_id, false)}
                    >
                      Cấm tài khoản
                    </Button>
                  ) : (
                    <Button
                      style={{
                        background: "green",
                        color: "white",
                        fontSize: 12,
                      }}
                      onClick={() => showConfirmModal(record.user_id, true)}
                    >
                      Mở tài khoản
                    </Button>
                  )}
                </div>
              ) : (
                <Button
                  type="text"
                  style={{ paddingLeft: 50 }}
                  icon={<DashOutlined />}
                />
              )}
            </Space>
          )}
        />
      </Table>

      <Modal
        title="Xác nhận thay đổi trạng thái tài khoản"
        visible={confirmModalVisible}
        onOk={handleConfirmChangeStatus}
        onCancel={() => setConfirmModalVisible(false)}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        Bạn có chắc là bạn muốn thay đổi trạng thái của tài khoản này không?
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ManageAccount;
