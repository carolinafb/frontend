import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header>
        <Navbar className="" />
      </Header>
      <Content>
        Content //homeChief //homeMedico //homeAdmin //homeSystemRoules
      </Content>
    </Layout>
  );
};

export default Home;
