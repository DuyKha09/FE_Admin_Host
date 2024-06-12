import { Input, Button, Tag, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import axiosClient from "../../../api/customFetch";
import { baseURL, services } from "../../../api/endPoints";
import { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { useNavigate } from "react-router-dom";
import avatar from "../../../assets/avatar.jpg";

const { Meta } = Card;
const { Title } = Typography;

const ManageService = () => {
  const navigate = useNavigate();

  const [service, setService] = useState([]);

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

  return (
    <div>
      <Title level={4} style={{ marginTop: -25 }}>
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
                <EditOutlined
                  key="edit"
                  onClick={() =>
                    handleViewDetails(service.id)
                  }
                />,
              ]}
            >
              <Meta
                avatar={<Avatar src={avatar} />}
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
                      <p style={{ color: "red" }}>${service.price}</p>{" "}
                    </div>
                    {service.status === false && (
                      <Tag color="blue">Processing</Tag>
                    )}
                    {service.status === true && <Tag color="green">Done</Tag>}
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      </Content>
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
