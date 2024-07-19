import React, { useEffect, useState } from "react";
import {
  Descriptions,
  theme,
  Card,
  Image,
  Empty,
  Typography,
  Menu,
} from "antd";
import { Content } from "antd/es/layout/layout";
import { useParams } from "react-router-dom";
import axiosClient from "../../../api/customFetch";
import {
  baseURL,
  users,
  pets,
  pet_type,
  pet_breed,
} from "../../../api/endPoints";

const { Title } = Typography;

const UserDetail = () => {
  const { user_id } = useParams();
  const [user, setUser] = useState({});
  const [userPets, setUserPets] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [petBreeds, setPetBreeds] = useState([]);
  const [stateOpenKeys, setStateOpenKeys] = useState([]);

  const fetchUserDetail = async () => {
    try {
      const response = await axiosClient.get(baseURL + users + `/${user_id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user detail:", error);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await axiosClient.get(baseURL + pets);
      const petsData = response.data;
      const filteredPets = petsData.filter((pet) => pet.user_id === user_id);
      setUserPets(filteredPets);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const fetchPetTypes = async () => {
    try {
      const response = await axiosClient.get(baseURL + pet_type);
      setPetTypes(response.data);
    } catch (error) {
      console.error("Error fetching pet types:", error);
    }
  };

  const fetchPetBreeds = async () => {
    try {
      const response = await axiosClient.get(baseURL + pet_breed);
      setPetBreeds(response.data);
    } catch (error) {
      console.error("Error fetching pet breeds:", error);
    }
  };

  useEffect(() => {
    fetchUserDetail();
    fetchPets();
    fetchPetTypes();
    fetchPetBreeds();
  }, [user_id]);

  const getPetTypeById = (typeId) => {
    return petTypes.find((type) => type.id === typeId);
  };

  const getPetBreedById = (breedId) => {
    return petBreeds.find((breed) => breed.id === breedId);
  };

  const onOpenChange = (openKeys) => {
    setStateOpenKeys(openKeys);
  };

  return (
    <div>
      <Title level={4} style={{ marginTop: -25, marginLeft: 30 }}>
        Quản Lý Thông Tin Khách Hàng
      </Title>
      <div
        style={{
          height: "80vh",
          marginBottom: "30px",
          overflowY: "scroll",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <Content
          style={{ margin: "0 16px", paddingBottom: "16px", marginTop: 20 }}
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
              title="Thông Tin Khách Hàng"
              style={{ marginBottom: 24 }}
              bordered={false}
            >
              <Descriptions style={{ marginBottom: 24 }}>
                <Descriptions.Item label="Tên Khách Hàng">
                  {user.full_name}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {user.email}
                </Descriptions.Item>
                <Descriptions.Item label="Số Điện Thoại">
                  {user.phone_number}
                </Descriptions.Item>
                <Descriptions.Item label="Số Lượng Pet Hiện Tại">
                  {userPets.length}
                </Descriptions.Item>
                <Descriptions.Item>
                  <span
                    style={{ color: user.account_status ? "green" : "red" }}
                  >
                    {user.account_status ? "Hoạt Động" : "Đã Bị Ban"}
                  </span>
                </Descriptions.Item>
              </Descriptions>
              <Card
                title="Thông Tin Thú Cưng"
                style={{ marginBottom: 24 }}
                bordered={false}
              >
                {userPets.length === 0 ? (
                  <Empty description="Hiện Khách Hàng Này Chưa Có Pet" />
                ) : (
                  userPets.map((pet) => (
                    <Menu
                      mode="inline"
                      openKeys={stateOpenKeys}
                      onOpenChange={onOpenChange}
                    >
                      <Card
                        type="inner"
                        title={`Tên Thú Cưng: ${pet.pet_name}`}
                        key={pet.id}
                        style={{ marginBottom: "20px" }}
                      >
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr auto",
                            gridGap: "8px",
                          }}
                        >
                          <div>
                            <Descriptions>
                              <Descriptions.Item label="Loại Thú Cưng">
                                {getPetTypeById(pet.pet_type_id)?.type_name}
                              </Descriptions.Item>
                              <Descriptions.Item label="Giống Thú Cưng" span={3}>
                                {getPetBreedById(pet.pet_breed_id)?.breed_name}
                              </Descriptions.Item>
                              <Descriptions.Item label="Chiều Cao">
                                {pet.height} cm
                              </Descriptions.Item>
                              <Descriptions.Item label="Cân Nặng" span={3}>
                                {pet.weight} kg
                              </Descriptions.Item>
                              <Descriptions.Item label="Đặc Điểm">
                                {
                                  getPetBreedById(pet.pet_breed_id)
                                    ?.breed_description
                                }
                              </Descriptions.Item>
                            </Descriptions>
                          </div>
                          <div>
                            <Image
                              src={pet.image}
                              alt={pet.pet_name}
                              style={{
                                width: 300,
                                height: 300,
                                borderRadius: 30,
                              }}
                            />
                          </div>
                        </div>
                      </Card>
                    </Menu>
                  ))
                )}
              </Card>
            </Card>
          </div>
        </Content>
      </div>
    </div>
  );
};

export default UserDetail;
