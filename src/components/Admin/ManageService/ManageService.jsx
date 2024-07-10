import { Button, Space, Tag, Typography, Modal } from "antd";
import { Content } from "antd/es/layout/layout";
import axiosClient from "../../../api/customFetch";
import { baseURL, services, updateServiceStatus } from "../../../api/endPoints";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title } = Typography;

const ManageService = () => {
  const navigate = useNavigate();

  const [service, setService] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const fetchServiceData = async () => {
    try {
      const response = await axiosClient.get(baseURL + services);
      console.log(response);
      setService(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/admin/manageService/${id.toString()}`);
  };

  const handleApproveService = async (id) => {
    try {
      await axiosClient.patch(`${baseURL}${updateServiceStatus}/${id}`);
      fetchServiceData();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (id) => {
    setSelectedServiceId(id);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (selectedServiceId) {
      handleApproveService(selectedServiceId);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedServiceId(null);
  };

  return (
    <div>
      <Title level={4} style={{ marginTop: -25, marginLeft: 30 }}>
        Quản Lý Dịch Vụ
      </Title>
      <Content>
        <div
          style={{
            padding: 20,
            minHeight: 360,
            borderRadius: 10,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            overflowY: "scroll",
            height: "calc(100vh - 150px)",
          }}
          className="hide-scrollbar"
        >
          {service.map((service) => (
            <Card
              key={service._id}
              style={{
                width: 150,
                margin: "8px",
                marginBottom: "12px",
                flex: "0 1 calc(25% - 16px)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.5)",
              }}
              cover={
                <img
                  alt="example"
                  src={
                    service.image
                      ? service.image
                      : "https://ngochoandesign.com/wp-content/uploads/2023/07/thiet-ke-service-dep-gia-re-02.png"
                  }
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderBottom: "2px solid #d9d9d9",
                  }}
                />
              }
              actions={[
                <Space key="edit" onClick={() => handleViewDetails(service.id)} style={{color: "blue", marginTop: 5}}>
                  <EditOutlined />
                  Xem Chi Tiết
                </Space>,
                !service.status && (
                  <Button key="approve" onClick={() => showModal(service.id)} style={{background: "green", color: "white"}}>
                    Duyệt
                  </Button>
                ),
              ].filter(Boolean)}
            >
              <Meta
                title={service.service_name}
                description={
                  <div>
                    <div
                      style={{
                        color: "#000",
                        fontSize: "14px",
                        marginBottom: 10,
                      }}
                    >
                      <p>Thương Hiệu: {service.brand.brand_name}</p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <p style={{ color: "red" }}>Giá: {service.price} VND</p>
                      {service.status === false && (
                        <Tag color="blue" style={{ marginTop: -17 }}>
                          Chờ duyệt
                        </Tag>
                      )}
                      {service.status === true && (
                        <Tag color="green" style={{ marginTop: -17 }}>
                          Đã duyệt
                        </Tag>
                      )}
                    </div>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </Content>
      <Modal
        title="Xác nhận duyệt dịch vụ"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <p>Bạn có chắc chắn muốn duyệt dịch vụ này không?</p>
      </Modal>
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
};

export default ManageService;
