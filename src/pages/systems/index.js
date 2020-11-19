import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import SystemsAdmin from "../../components/systems/Systems";
import { UserContext } from "../../../contexts/UserContext";
import axiosInstance from "../../components/axios";

const systems = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});
  const { DBUser } = useContext(UserContext);

  useEffect(() => {
    axiosInstance.get("/systems").then((res) => setstate(res.data));
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={DBUser} />
      </Header>
      <Content>
        <SystemsAdmin systems={state.systems} />
      </Content>
    </Layout>
  );
};

export default systems;
