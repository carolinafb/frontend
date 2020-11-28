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
  Select,
  Spin,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../../components/axios";
import { UserContext } from "../../../contexts/Context";

const CreateInternment = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const { TextArea } = Input;
  const [infoRooms, setInfoRooms] = useState(null);
  const [infoBeds, setInfoBeds] = useState(null);
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;
  const { DBUser, needCreateBeds, idPatient } = useContext(UserContext);
  const { Option } = Select;

  const btnErr = () => {
    setLoading(true);
    if (DBUser && DBUser.role == "DOCTOR") {
      router.push("/patients");
    } else {
      router.push("/systems");
    }
  };
  function callToBackToAddData(url, values) {
    setLoading(true);
    axiosInstance
      .put(url, values)
      .then((res) => {
        if (res.status) {
          router.push(res.data.redirect);
        }
      })
      .catch((err) => {
        setErr(err.message);
      });
  }
  const callToBackForInfo = (method, url, param) => {
    setLoading(true);
    axiosInstance
      .request({ method, url, params: param })
      .then((res) => {
        url === "/beds/withSpace" && setInfoBeds(res.data);
        if (res.data.length === 0) {
          callToBackForInfo("get", "/system", { id: 1 });
        }
        setInfoRooms(res.data);
        setLoading(false);
      })
      .catch((e) => {
        setErr(e.message);
      });
  };

  const onFinish = (values) => {
    setLoading(true);
    values.idPatient = idPatient;
    if (!needCreateBeds) {
      callToBackToAddData("/internment", values);
    } else {
      callToBackToAddData("/internmentWithNewBed", values);
    }
  };

  const onRoomSelect = (room) => {
    if (!needCreateBeds) {
      callToBackForInfo("get", "/beds/withSpace", { id: room });
    }
  };
  useEffect(() => {
    callToBackForInfo("get", "/rooms/withSpace", { id: 1 });
  }, []);

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
              {loading && (
                <div className="align-column-center margin__big">
                  <Spin size="large" tip="Loading..." />
                </div>
              )}
              <Form
                layout="vertical"
                name="createInternment"
                onFinish={onFinish}
                initialValues={{
                  remember: true,
                }}
              >
                <Form.Item
                  label="Fecha de inicio de sintomas:"
                  name="dateOfSymptoms"
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
                  name="dateOfDiagnosis"
                  rules={[
                    {
                      required: true,
                      message: "Ingrese una fecha.",
                    },
                  ]}
                >
                  <DatePicker placeholder="Fecha de inicio diagnostico" />
                </Form.Item>

                <Form.Item
                  label="Comorbilidades: "
                  name="historyOfDisease"
                  rules={[
                    {
                      required: true,
                      message: "Campo obligatorio!",
                    },
                  ]}
                >
                  <TextArea placeholder="Leve descripcion" />
                </Form.Item>
                {infoRooms && (
                  <Form.Item
                    label="Salas: "
                    name="room"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese la sala!",
                      },
                    ]}
                  >
                    <Select onSelect={onRoomSelect}>
                      {infoRooms.map((element) => {
                        return (
                          <Option value={element.id} key={element.id}>
                            {element.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                )}
                {needCreateBeds ? (
                  <Form.Item
                    label="Nombre de la cama:"
                    name="bed"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese el nombre!",
                      },
                    ]}
                  >
                    <Input placeholder="Nombre de la cama" />
                  </Form.Item>
                ) : (
                  infoBeds && (
                    <Form.Item
                      label="Camas libres: "
                      name="bed"
                      rules={[
                        {
                          required: true,
                          message: "Por favor ingrese la cama!",
                        },
                      ]}
                    >
                      <Select>
                        {infoBeds.map((element) => {
                          return (
                            <Option key={element.id}>{element.name}</Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  )
                )}
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    CREAR INTERNACION
                  </Button>
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
