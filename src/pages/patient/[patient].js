import Navbar from "../../components/header/Navbar";
import { Divider, Button, Layout, Row, Col, Result, Typography } from "antd";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../components/axios";
import { UserContext } from "../../contexts/Context";

const Patient = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const [patientData, setPatientData] = useState(null);
  const [err, setErr] = useState(false);
  const { Title } = Typography;
  const { DBUser } = useContext(UserContext);
  const [rerender, setRerender] = useState(true);

  useEffect(() => {
    if (router.query.patient) {
      axiosInstance
        .get("/patient", {
          params: {
            id: router.query.patient,
          },
        })
        .then((res) => {
          setErr(false);
          setPatientData(res.data);
        })
        .catch((e) => {
          setErr(e.message);
          setPatientData(null);
        });
    }
  }, [router.query.patient]);

  /*const createHospitalization = () => {
    axiosInstance
      .post("/createHospitalization", {
        patientID: id,
      })
      .then((res) => {
        router.push(res.data.redirect);
      })
      .catch((err) => {
        if (err.response) setErr(err.response.data);
        else setErr("Algo salio mal! No se pudo crear la internacion.");
      });
  };*/

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
            <Fragment>
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
                  {console.log(DBUser)}
                  {DBUser && DBUser.systemId === 1 && (
                    <Button type="primary" style={{ margin: "3%" }}>
                      CREAR INTERNACION
                    </Button>
                  )}
                </Col>
              </Row>
            </Fragment>
          )
        )}
      </Content>
    </Layout>
  );
};

export default Patient;
