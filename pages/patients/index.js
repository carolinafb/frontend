import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import Rooms from "../../components/patients/Rooms";
import axios from "axios";

const Patients = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});

  useEffect(() => {
    axios.get("http://localhost:9000/init").then((res) => setstate(res.data));
  }, [setstate]);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={state.user} />
      </Header>
      <Content>
        <Rooms info={state.rooms} />
      </Content>
    </Layout>
  );
};

export default Patients;
