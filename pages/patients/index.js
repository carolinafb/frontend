import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import Rooms from "../../components/patients/Rooms";
const { Header, Content } = Layout;

const Patients = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar/>
      </Header>
      <Content>
        <Rooms/>
      </Content>
    </Layout>
  );
};

export default Patients;
