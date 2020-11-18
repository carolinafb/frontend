import Navbar from "../../../components/header/Navbar";
import { Layout } from "antd";
import React, { useState } from "react";
import AddPatientData from "../../../components/createPatient/AddPatientData";

const AddPatientsData = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={{}} />
      </Header>
      <Content>
        <AddPatientData />
      </Content>
    </Layout>
  );
};

export default AddPatientsData;
