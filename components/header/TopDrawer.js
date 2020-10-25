import React, { Fragment } from "react";
import { Card, Typography, Switch } from "antd";

const TopDrower = ({ userInfo }) => {
  const { role, name, lastname, system } = userInfo;
  const { Title } = Typography;

  return (
    <Card
      style={{
        backgroundColor: "rgb(107, 45, 177)",
        textAlign: "center",
      }}
      bordered={false}
    >
      <Title level={5}>SISTEMA {system}</Title>
      <Title level={3}>
        {name}
        <br />
        {lastname}
      </Title>
      <p>{role}</p>
      <div>
        <label>En Linea:</label>
        <br />
        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
      </div>
    </Card>
  );
};
export default TopDrower;
