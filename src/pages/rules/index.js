import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import HomeSystemRule from "../../components/home/HomeSystemRule";
import axiosInstance from "../axios";

const Home = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});

  /* useEffect(() => {
    axiosInstance.get("http://localhost:9000/init").then((res) => setstate(res.data));
  }, [setstate]);
*/
  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={state.user} />
      </Header>
      <Content>
        <HomeSystemRule />
      </Content>
    </Layout>
  );
};

export default Home;
