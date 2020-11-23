import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import SystemsAdmin from "../../components/adminsys/SystemsAdmin";
import axiosInstance from "../../components/axios";

const adminsys = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});

  //useEffect(() => {
  //  axiosInstance.get("/adminsys").then((res) => setstate(res.data));
  //}, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={state.user} />
      </Header>
      <Content>
        <SystemsAdmin systems={state.systems} />
      </Content>
    </Layout>
  );
};

export default adminsys;
