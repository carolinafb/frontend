import Navbar from "../../../components/header/Navbar";
import React, { useState, useContext } from "react";
import axiosInstance from "../../../components/axios";
import { useRouter } from "next/router";
import { UserContext } from "../../../contexts/Context";
import { useTranslation } from "react-i18next";
import {
  Typography,
  InputNumber,
  Alert,
  Form,
  Button,
  Layout,
  Space,
  Spin,
} from "antd";

const AddPatients = () => {
  const { Header, Content } = Layout;
  const router = useRouter();
  const { Title } = Typography;
  const { t } = useTranslation();
  const [msg, setErr] = useState(null);
  const { setDniPatient, DBUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const onFinish = (e) => {
    setLoading(true);
    setDniPatient(e.dni);
    axiosInstance
      .post("/patient", {
        dni: e.dni,
      })
      .then((res) => {
        router.push(res.data.redirect);
      })
      .catch((err) => {
        setErr(err.message);
      });
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Title align="center" level={3} style={{ marginTop: "3%" }}>
            INGRESAR PACIENTE
          </Title>
          {msg ? <Alert message={t(msg)} type="error" /> : null}
          {loading && (
            <div className="align-column-center margin__big">
              <Spin size="large" tip="Loading..." />
            </div>
          )}
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
                {
                  required: true,
                  message: "Ingrese el DNI de la persona",
                },
              ]}
            >
              <InputNumber min={1} max={2147483647} style={{ width: "50%" }} />
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
