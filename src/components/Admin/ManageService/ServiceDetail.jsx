import React, { useEffect, useState } from "react";
import { Descriptions, theme, Card, Image, Typography, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import axiosClient from "../../../api/customFetch";
import { baseURL, services } from "../../../api/endPoints";

const { Title } = Typography;

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState({});
  const [brand, setBrand] = useState({});
  const [location, setLocation] = useState({});
  const [category, setCategory] = useState({});

  const fetchServiceData = async () => {
    try {
      const response = await axiosClient.get(baseURL + services + `/${id}`);
      setService(response.data);
      setBrand(response.data.brand);
      setLocation(response.data.location);
      setCategory(response.data.category);
    } catch (error) {
      console.log("Error fetching service detail:", error);
    }
  };

  useEffect(() => {
    fetchServiceData();
  }, [id]);

  return (
    <div style={{ height: "80vh", marginBottom: "30px" }}>
      <Title level={4} style={{ marginTop: -25, marginLeft: 30 }}>
        Quản Lý Dịch Vụ
      </Title>
      <Content
        style={{ margin: "0 16px", paddingBottom: "16px", overflowY: "hidden" }}
      >
        <div
          style={{
            padding: 24,
            background: theme.useToken().token.colorBgContainer,
            borderRadius: theme.useToken().token.borderRadiusLG,
          }}
          className="max-w-md mx-auto"
        >
          <Card
            title="Thông tin dịch vụ"
            style={{ marginBottom: 24 }}
            bordered={false}
          >
            <Row gutter={[16, 16]}>
              <Col span={14}>
                <Descriptions style={{ marginBottom: 24 }}>
                  <Descriptions.Item label="Dịch vụ" span={3}>
                    {service.service_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian mở cửa">
                    {service.starttime}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thời gian đóng cửa" span={3}>
                    {service.endtime}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thương hiệu" span={3}>
                    {brand.brand_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại dịch vụ" span={3}>
                    {category.category_name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giá tiền" span={3}>
                    ${service.price}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tóm tắt về dịch vụ" span={3}>
                    {service.service_description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Tóm tắt về loại dịch vụ" span={3}>
                    {category.category_description}
                  </Descriptions.Item>
                  <Descriptions.Item label="Địa chỉ" span={3}>
                    {location.location_address}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
              <Col span={10}>
                <Image
                  src={service.image}
                  alt={service.service_name}
                  style={{ width: "130%", height: "auto", borderRadius: 30 }}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </div>
  );
};

export default ServiceDetail;
