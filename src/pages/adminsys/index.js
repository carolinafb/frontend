import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import SystemsAdmin from "../../components/adminsys/SystemsAdmin";
import axiosInstance from "../../components/axios";
import { UserContext } from "../../../contexts/UserContext";

const adminsys = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});
  const { DBUser } = useContext(UserContext);

  useEffect(() => {
    axiosInstance.get("/adminsys").then((res) => setstate(res.data));
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        <SystemsAdmin systems={state.systems} />
      </Content>
    </Layout>
  );
};

export default adminsys;
