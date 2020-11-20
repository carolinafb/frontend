import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import SystemsAdmin from "../../components/adminsys/SystemsAdmin";
import axiosInstance from "../../components/axios";

const adminsys = () => {
  const { Header, Content } = Layout;
  const [systems, setSystems] = useState([]);
  const getSystems = async () => (await axiosInstance.get("/adminsys")).data.systems;
  const refreshSystems = async () => setSystems(await getSystems());
  useEffect(() => { refreshSystems() });

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar />
      </Header>
      <Content>
        <SystemsAdmin systems={systems} refreshData={refreshSystems} />
      </Content>
    </Layout>
  );
};

export default adminsys;