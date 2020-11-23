import Navbar from "../../../components/header/Navbar";
import { Layout } from "antd";
import React, { useContext } from "react";
import AddPatientData from "../../../components/createPatient/AddPatientData";
import { UserContext } from "../../../contexts/Context";

const AddPatientsData = () => {
  const { Header, Content } = Layout;
  const { DBUser } = useContext(UserContext);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        <AddPatientData />
      </Content>
    </Layout>
  );
};

export default AddPatientsData;
