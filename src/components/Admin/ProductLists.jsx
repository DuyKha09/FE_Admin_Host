import { Button, Card, Flex, Image, Typography } from "antd";
import React from "react";
import Data from "./Data";
const { Meta } = Card;
const ProductLists = () => {
  return (
    <>
      <Flex align="center" justify="space-between">
        <Typography.Title level={3} strong className="primary--color">
          My Listing
        </Typography.Title>
        <Button type="link" className="gray--color">
          View All
        </Button>
      </Flex>
      <Flex align="center" gap="large">
        {Data.map((data) => (
          <Card key={data.id} hoverable className="data-card">
            <Image src={data.picture} style={{ width: "230px" }} />
            <Meta title={data.name} style={{ marginTop: "1rem" }} />
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default ProductLists;
