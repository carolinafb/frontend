import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import Navbar from "../../components/header/Navbar";
import HomeSystemRoules from "../../components/home/HomeSystemRule";
import HomeChief from "../../components/home/HomeChief";

const Home = () => {
  const { Header, Content } = Layout;
  let buttonsToShow = [];
  const user = {
    role: "ADMIN",
    name: "Carolina",
    lastname: "Fernandez",
    system: "UTI",
  };

   useEffect(() => {
     axios
       .get("https:8080/init")
       .then((res) => setprojects(res.data));
   }, [setprojects]);

  useEffect(() => {
    if (user.role == ("DOCTOR" || "SYSTEMCHIEF")) {
      buttonsToShow.push("ALERTAS");
      if (user.system == "GUARDIA") {
        buttonsToShow.push("INGRESAR PACIENTE");
      }
    }
    if (user.role == "SYSTEMCHIEF") {
      buttonsToShow.push("PACIENTES NUEVOS");
    }
    if (user.role == "ADMIN") {
      buttonsToShow.push("SISTEMAS");
      buttonsToShow.push("JEFES/MEDICOS");
      buttonsToShow.push("EVALUACIONES");
    }
  });

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={user} buttons={buttonsToShow} />
      </Header>
      <Content>
        <HomeChief />
      </Content>
    </Layout>
  );
};

export default Home;
