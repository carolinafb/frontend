import Navbar from "../../components/header/Navbar";
import { Divider, Button, Layout, Row, Col } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { Typography } from "antd";
import { useRouter } from "next/router";
import axiosInstance from "../../components/axios";
import { UserContext } from "../../contexts/UserContext";
import MsgFeed from "../../components/feedback/msgFeed";

const Patient = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const [patientData, setPatientData] = useState(null);
  const [err, setErr] = useState(false);
  const { Title } = Typography;
  const { jwt, DBUser } = useContext(UserContext);

  useEffect(() => {
    axiosInstance
      .get("/infoPatient", {
        params: {
          id: router.query.patient,
        },
      })
      .then((res) => {
        setPatientData(res.data.data);
      });
  }, []);

  const createHospitalization = () => {
    axiosInstance
      .post("/createHospitalization", {
        patientID: id,
      })
      .then((res) => {
        router.push(res.data.redirect);
      })
      .catch((err) => {
        if (err.response) setErr(err.response.data);
        else setErr("algo salio mal! No se pudo buscar el paciente.");
      });
  };

  const btnErr = () => {
    router.push("/"); //aca dependiendo del rol la pagina "home" cambia
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar info={DBUser} />
      </Header>
      <Content>
        {err && (
          <MsgFeed
            type="error"
            msg="no se puede crear la internacion.
                  NO HAY CAMAS DISPONIBLES"
            btnFun={btnErr}
            btnMsn="CERRAR"
          />
        )}
        {!(patientData == null || Object.keys(patientData).length === 0) && (
          <Row justify="start">
            <Col
              xs={24}
              sm={{ span: 15, offset: 1 }}
              lg={{ span: 10, offset: 1 }}
              xl={{ span: 6, offset: 1 }}
            >
              <Divider orientation="left">Paciente:</Divider>
              <Title level={4}>
                {patientData.lastName + " " + patientData.lastName}
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
              {patientData.background_clinical}
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
              <Button
                type="primary"
                style={{ margin: "3%" }}
                onClick={createHospitalization}
              >
                CREAR INTERNACION
              </Button>
            </Col>
          </Row>
        )}
      </Content>
    </Layout>
  );
};

export default Patient;
