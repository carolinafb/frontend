import React from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import HomeSystemRoules from "../../components/home/HomeSystemRule";
const { Header, Content } = Layout;

const Home = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar/>
      </Header>
      <Content>
        <HomeSystemRoules/>
      </Content>
    </Layout>
  );
};

export default Home;
