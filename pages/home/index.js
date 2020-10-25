import React from "react";
import { Layout, Space } from "antd";
import Navbar from "../../components/header/Navbar";
import HomeChief from "../../components/home/HomeChief";

const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header>
        <Navbar />
      </Header>
      <Content>
        <HomeChief />
      </Content>
    </Layout>
  );
};

export default Home;
