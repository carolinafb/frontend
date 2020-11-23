import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import { UserContext } from "../../contexts/Context";
import Navbar from "../../components/header/Navbar";
import SystemsAdmin from "../../components/adminsys/SystemsAdmin";
import axiosInstance from "../../components/axios";

const adminsys = () => {
  const { Header, Content } = Layout;
  const { DBUser } = useContext(UserContext);

  const [systems, _setSystems] = useState([]);

  const getSystems = async () =>
    (await axiosInstance.get("/adminsys")).data.systems;

  const setSystems = async () => {
    _setSystems(await getSystems());
  };

  const refreshSystems = () => setSystems();

  useEffect(() => {
    setSystems();
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        <SystemsAdmin systems={systems} refreshData={refreshSystems} />
      </Content>
    </Layout>
  );
};

export default adminsys;
