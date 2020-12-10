import Navbar from "src/components/header/Navbar";
import {
  Divider,
  Button,
  Layout,
  Row,
  Col,
  Result,
  Typography,
  Spin,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axiosInstance from "src/components/axios";
import { UserContext } from "src/contexts/Context";

const Patient = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const [patientData, setPatientData] = useState(null);
  const [err, setErr] = useState(false);
  const { Title } = Typography;
  const { DBUser, setNeedCreateBeds, setIdPatient } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function calledBack(url, method) {
    setLoading(true);
    axiosInstance
      .request({ method, url, params: { id: router.query.id } })
      .then((res) => {
        if (method == "post") {
          setNeedCreateBeds(res.data.createBed);
          setIdPatient(router.query.id);
          router.push(res.data.redirect);
        } else {
          setPatientData(res.data);
        }
        setErr(false);
      })
      .catch((e) => {
        setErr(e.message);
        setPatientData(null);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (router.query.id) {
      calledBack("/patient", "get");
    }
  }, [router.query.id]);

  const createHospitalization = () => {
    if (router.query.id) {
      calledBack("/internment", "post");
    }
  };

  const btnErr = () => {
    if (DBUser && DBUser.role == "DOCTOR") {
      router.push("/patients");
    } else {
      router.push("/systems");
    }
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        {loading && (
          <div className="align-column-center margin__big">
            <Spin size="large" tip="Loading..." />
          </div>
        )}
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
          !(patientData == null || Object.keys(patientData).length === 0) && (
            <Row justify="start">
              <Col
                xs={{ span: 14, offset: 3 }}
                sm={{ span: 13, offset: 3 }}
                lg={{ span: 13, offset: 3 }}
                xl={{ span: 6, offset: 1 }}
              >
                <Divider orientation="left">Paciente:</Divider>
                <Title level={4}>
                  {patientData.name + " " + patientData.lastName}
                </Title>
                <label>
                  <strong> DNI:</strong>
                </label>
                {patientData.dni}
                <br />
                <label>
                  <strong>Fecha de nacimiento: </strong>
                </label>
                {patientData.birthDate.slice(0, 10)}
                <br />
                <label>
                  <strong> Direccion: </strong>
                </label>
                {patientData.direction}
                <br />
                <label>
                  <strong>Telefono:</strong>
                </label>
                {patientData.phone}
                <br />
                <label>
                  <strong>Email: </strong>
                </label>
                {patientData.email}
                <br />
                <label>
                  <strong> Obra Social: </strong>
                </label>
                {patientData.socialSecurity}
                <br />
                <label>
                  <strong> Antecedente Personales: </strong>
                </label>
                {patientData.background_clinical
                  ? patientData.background_clinical
                  : "ninguno"}
                <br />
                <Divider orientation="left">Persona de contacto: </Divider>
                <label>
                  <strong> Nombre: </strong>
                </label>
                {patientData.contactPerson.name}
                <br />
                <label>
                  <strong> Apellido: </strong>
                </label>
                {patientData.contactPerson.lastName}
                <br />
                <label>
                  <strong> Parentesco/Relacion: </strong>
                </label>
                {patientData.contactPerson.relationship}
                <br />
                <label>
                  <strong> Telefono: </strong>
                </label>
                {patientData.contactPerson.phone}
                <br />
                {DBUser && DBUser.systemName === "GUARDIA" && (
                  <Button
                    type="primary"
                    style={{ margin: "3%" }}
                    onClick={createHospitalization}
                  >
                    CREAR INTERNACION
                  </Button>
                )}
              </Col>
            </Row>
          )
        )}
      </Content>
    </Layout>
  );
};

export default Patient;
