import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import Systems from "../../components/adminsys/Systems";
import axios from "axios";

const adminsys = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});

  useEffect(() => {
    axios.get("http://localhost:9000/adminsys").then((res) => setstate(res.data));
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={state.user} />
      </Header>
      <Content>
        <Systems systems={state.systems} />
      </Content>
    </Layout>
  );
};

export default adminsys;