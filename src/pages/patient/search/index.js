import Navbar from "../../../components/header/Navbar";
import { Layout } from "antd";
import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { UserContext } from "../../../contexts/UserContext";
import { useTranslation } from "react-i18next";
import { Space, Typography, InputNumber, Alert, Form, Button } from "antd";

const AddPatients = () => {
  const { Header, Content } = Layout;
  const [state, setstate] = useState({});
  const router = useRouter();
  const { Title } = Typography;
  const { t } = useTranslation();
  const [msg, setErr] = useState(null);
  const { apiEndPoint, setDniPatient, setPatientData } = useContext(
    UserContext
  );

  const onFinish = (e) => {
    setDniPatient(e.dni);
    axios
      .post(apiEndPoint + "/addPatient", {
        dni: e.dni,
      })
      .then((res) => {
        setPatientData(res.data.data);
        router.push(res.data.redirect);
      })
      .catch((err) => {
        if (err.response) setErr(err.response.data);
        else setErr("algo salio mal! No se pudo buscar el paciente.");
      });
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={state.user} />
      </Header>
      <Content>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title align="center" level={3} style={{ marginTop: "3%" }}>
            INGRESAR PACIENTE
          </Title>
          {msg ? <Alert message={t(msg)} type="error" /> : null}

          <Form
            style={{ marginLeft: "3%" }}
            layout="horizontal"
            name="addPatientForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="Ingrese el DNI: "
              name="dni"
              rules={[
                { required: true, message: "Ingrese el DNI de la persona" },
              ]}
            >
              <InputNumber style={{ width: "50%" }} />
            </Form.Item>

            <Form.Item>
              <Button name="button" type="primary" htmlType="submit">
                Buscar
              </Button>
            </Form.Item>
          </Form>
          <Alert
            message="Nota"
            description="Al ingresar el DNI de la persona.
                        Si esta existe en el sistema se mostrara los datos de esta.
                        Si no existe, te direccionara a una pantalla para cargar sus datos"
            type="info"
            showIcon
          />
        </Space>
      </Content>
    </Layout>
  );
};

export default AddPatients;
