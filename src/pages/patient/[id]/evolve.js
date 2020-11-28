import React, { useContext } from 'react';
import { UserContext } from "../../../contexts/Context";
import Navbar from '../../../components/header/Navbar';
import { Layout } from "antd";

const Evolve = ({ ...props }) => {
    const { DBUser } = useContext(UserContext);
    const { Header, Content } = Layout;
    return (
        <Layout>
          <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
            <Navbar user={DBUser} />
          </Header>
          <Content>
            <h1>Evolucionar paciente</h1>
          </Content>
        </Layout>
      );
    };
export default Evolve;