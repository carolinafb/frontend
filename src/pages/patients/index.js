import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import Rooms from "../../components/patients/Rooms";
import { UserContext } from "../../contexts/UserContext";
import axiosInstance from "../../components/axios";

const Patients = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});
  const { DBUser } = useContext(UserContext);

  useEffect(() => {
    axiosInstance.get("/patients").then((res) => setstate(res.data));
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        <Rooms rooms={state.rooms} />
      </Content>
    </Layout>
  );
};

export default Patients;
