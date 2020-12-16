import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../axios";
import { Card, Typography, Switch, Button } from "antd";
import { UserContext } from "../../contexts/Context";

const TopDrower = ({ userInfo }) => {
  const { role, name, lastname, systemName } = userInfo;
  const { Title } = Typography;
  // ROLES TO COMPARE: "ADMIN" "DOCTOR" "SYSTEMCHIEF" "SYSTEMRULES"

  const onChangeInfinitBedsOfSystem = () => {
    axiosInstance.put("/user/online-offline", {}).then((res) => {
      refreshData();
    });
  };

  const { online, setOnline } = useContext(UserContext);

  const toggle = () => {
    console.log("toggle");
    setOnline(!online);
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
          <Switch defaultChecked={online} onChange={toggle} />
          <br />
        </div>
      ) : null}
    </Card>
  );
};
export default TopDrower;
