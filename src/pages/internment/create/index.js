import Navbar from "../../../components/header/Navbar";
import {
  Button,
  Layout,
  Row,
  Col,
  Result,
  Typography,
  Form,
  DatePicker,
  Input,
} from "antd";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";
//import axiosInstance from "../../components/axios";
import { UserContext } from "../../../contexts/Context";

const CreateInternment = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const { TextArea } = Input;
  const [createInternmentData, setcreateInternmentData] = useState(null);
  const [err, setErr] = useState(false);
  const { Title } = Typography;
  const { DBUser } = useContext(UserContext);
  const [rerender, setRerender] = useState(true);

  const btnErr = () => {
    if (DBUser && DBUser.role == "DOCTOR") {
      router.push("/patients");
    } else {
      router.push("/systems");
    }
  };

  useEffect(() => {
    axiosInstance
      .get("/system")
      .then((res) => {
        setErr(false);
        setData(res.data);
      })
      .catch((e) => {
        setErr(e.message);
        setData(null);
      });
  }),
    [];

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        {err ? (
          <Result
            status="error"
            title={err}
            extra={
              <Button
                type="primary"
                style={{ backgroundColor: "#FF4D4F", border: "#FF4D4F" }}
                onClick={btnErr}
              >
                CONTINUAR
              </Button>
            }
          />
        ) : (
          <Row justify="start">
            <Col
              xs={24}
              sm={{ span: 15, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 6, offset: 1 }}
            >
              <Title align="center" level={3} style={{ marginTop: "3%" }}>
                CREAR INTERNACION
              </Title>
              {err && (
                <Alert
                  message={err}
                  type="error"
                  style={{ alignContent: "center" }}
                />
              )}

              <Form
                layout="vertical"
                name="createInternment"
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  label="Fecha de inicio de sintomas:"
                  name="DateSymptom "
                  rules={[
                    {
                      required: true,
                      message: "Ingrese una fecha.",
                    },
                  ]}
                >
                  <DatePicker placeholder="Fecha de inicio de sintomas" />
                </Form.Item>

                <Form.Item
                  label="Fecha de inicio diagnostico:"
                  name="DateDiagnosticStart"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese una fecha.",
                    },
                  ]}
                >
                  <DatePicker placeholder="Fecha de inicio diagnostico" />
                </Form.Item>

                <Form.Item label="Comorbilidades: " name="comorbidities">
                  <TextArea placeholder="Leve descripcion" />
                </Form.Item>
              </Form>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default CreateInternment;
