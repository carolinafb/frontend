import React, { useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import HomeSystemRoules from "../../components/home/HomeSystemRule";
import HomeChief from "../../components/home/HomeChief";

const Home = () => {
  const { Header, Content } = Layout;

  /* useEffect(() => {
     axios
       .get("https://")
       .then((res) => setprojects(res.data));
   }, [setprojects]);*/

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar />
      </Header>
      <Content>
        <HomeChief />
      </Content>
    </Layout>
  );
};

export default Home;
