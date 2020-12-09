import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Card, Typography, Switch } from "antd";

const TopDrower = ({ userInfo }) => {
  const { role, name, lastname, systemName } = userInfo;
  const { Title } = Typography;
  // ROLES TO COMPARE: "ADMIN" "DOCTOR" "SYSTEMCHIEF" "SYSTEMRULES"

const onChangeInfinitBedsOfSystem = () => {
  axiosInstance
    .put("/user/online-offline", {})
    .then((res) => {
      refreshData();
    });
};

  return (
    <Card
      style={{
        backgroundColor: "rgb(107, 45, 177)",
        textAlign: "center",
      }}
      bordered={false}
    >
      <Title level={5}>SISTEMA {systemName}</Title>
      <Title level={3}>
        {name}
        <br />
        {lastname}
      </Title>
      <p>{role}</p>
      {role == ("DOCTOR" || "SYSTEMCHIEF") ? (
        <div>
          <label>
            <strong>En Linea:</strong>
          </label>
          <br />
          <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
        </div>
      ) : null}
    </Card>
  );
};
export default TopDrower;
