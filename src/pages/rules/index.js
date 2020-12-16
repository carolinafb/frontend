import React, { useEffect, useState, useContext } from "react";
import { Layout } from "antd";
import { UserContext } from "../../contexts/Context";
import Navbar from "../../components/header/Navbar";
import axiosInstance from "../../components/axios";
import Rule from "../../components/rules/Rule";

const rules = () => {
  const { Header, Content } = Layout;
  const { DBUser } = useContext(UserContext);
  const [rulesData, setRulesData] = useState(null);

  useEffect(() => {
    if (DBUser) {
      axiosInstance
        .get("/rules")
        .then((res) => {
          setRulesData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        {rulesData ? (
          rulesData.map((data) => {
            return <Rule data={data} />;
          })
        ) : (
          <p>No hay reglas para mostrar</p>
        )}
      </Content>
    </Layout>
  );
};

export default rules;
