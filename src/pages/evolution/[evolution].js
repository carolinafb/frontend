import Navbar from "../../components/header/Navbar";
import {
  Empty,
  Button,
  Layout,
  Row,
  Col,
  Result,
  Typography,
  Collapse,
  Spin,
  Tabs,
} from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../components/axios";
import { UserContext } from "../../contexts/Context";
import ClinicalStudy from "../../components/evolution/ClinicalStudy";

const Evolution = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const { Title } = Typography;
  const { DBUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function calledBack(url, method) {
    setLoading(true);
    axiosInstance
      .request({ method, url, params: { id: router.query.evolution } })
      .then((res) => {
        if (method == "post") {
          router.push(res.data.redirect);
        } else {
          console.log(res.data);
          setData(res.data);
          console.log("DBUSER:", DBUser);
        }
        setErr(false);
      })
      .catch((e) => {
        setErr(e.message);
        setData(null);
      });
    setLoading(false);
  }

  useEffect(() => {
    if (router.query.evolution) {
      calledBack("/evolution", "get");
    }
  }, [router.query.evolution]);

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
          !(data == null || Object.keys(data).length === 0) && (
            <Row justify="start">
              <Col
                xs={{ span: 20, offset: 2 }}
                sm={{ span: 18, offset: 3 }}
                lg={{ span: 14, offset: 5 }}
              >
                <Title level={5}>
                  {data.evolution.createTime.slice(0, -14) +
                    " " +
                    data.evolution.createTime.slice(11, -8)}
                </Title>
                <Title level={4}>{data.name + " " + data.lastName}</Title>
                <Collapse accordion bordered={false}>
                  <Panel header="SIGNOS VITALES" key="1">
                    <p>
                      <strong>Temperatura: </strong>
                      {data.evolution.temperature
                        ? data.evolution.temperature
                        : "No cargado"}{" "}
                      °C
                    </p>
                    <p>
                      <strong>TA Sistolica: </strong>
                      {data.evolution.systolicBloodPressure
                        ? data.evolution.systolicBloodPressure + " mmHg"
                        : "No cargado"}
                    </p>
                    <p>
                      <strong>TA Diastolica: </strong>
                      {data.evolution.diastolicBloodPressure
                        ? data.evolution.diastolicBloodPressure + " mmHg"
                        : "No cargado"}
                    </p>
                    <p>
                      <strong>FC: </strong>
                      {data.evolution.heartRate
                        ? data.evolution.heartRate + " lpm"
                        : "No cargado"}
                    </p>
                    <p>
                      <strong>FR: </strong>
                      {data.evolution.breathingFrequency
                        ? data.evolution.breathingFrequency + "  rpm"
                        : "No cargado"}
                    </p>
                  </Panel>
                  <Panel header="SISTEMA RESPIRATORIO" key="2">
                    <p>
                      <strong>Mecanica ventilatoria: </strong>
                      {data.evolution.ventilatoryMechanics
                        ? data.evolution.ventilatoryMechanics
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>Requiere O2 suplementario: </strong>

                      {data.evolution.requiresSupplementalOxygen
                        ? data.evolution.requiresSupplementalOxygen
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>Tipo: </strong>
                      {data.evolution.nasalOxygenCannula
                        ? data.evolution.nasalOxygenCannula
                        : "No cargado"}
                      :
                      {data.evolution.litersPerMinute &&
                        data.evolution.litersPerMinute + " lts/min"}
                      {data.evolution.maskWithReservoir
                        ? data.evolution.maskWithReservoir
                        : "No cargado"}
                      :
                      {data.evolution.maskValue &&
                        data.evolution.maskValue + " %O2"}
                    </p>

                    <p>
                      <strong>Saturacion de O2: </strong>
                      {data.evolution.oxygenSaturation
                        ? data.evolution.oxygenSaturation + " %"
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>PaFi: </strong>
                      {data.evolution.pafi ? data.evolution.pafi : "No cargado"}

                      {data.evolution.pafiValue &&
                        data.evolution.pafi &&
                        data.evolution.pafiValue + " mmHg"}
                    </p>

                    <p>
                      <strong>Tos: </strong>
                      {data.evolution.cough
                        ? data.evolution.cough
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>Disnea: </strong>
                      {data.evolution.dyspnoea
                        ? data.evolution.dyspnoea
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>
                        Estabilidad/desaparicion de sintomas respiratorios:
                      </strong>
                      {data.evolution.respiratorySymptoms
                        ? data.evolution.respiratorySymptoms
                        : "No cargado"}
                    </p>
                  </Panel>
                  <Panel header="OTROS SINTOMAS" key="3">
                    <p>
                      <strong>Somnolencia: </strong>
                      {data.evolution.drowsiness
                        ? data.evolution.drowsiness
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>Anosmia: </strong>
                      {data.evolution.anosmia
                        ? data.evolution.anosmia
                        : "No cargado"}
                    </p>

                    <p>
                      <strong>Disgeusia: </strong>
                      {data.evolution.disagreement
                        ? data.evolution.disagreement
                        : "No cargado"}
                    </p>
                  </Panel>
                  <Panel header="ESTUDIOS REALIZADOS HOY" key="4">
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="RxTx" key="1">
                        {data.evolution.chestXRay ? (
                          <ClinicalStudy
                            type={data.evolution.chestXRayPathological}
                            description={data.evolution.chestXRayDescription}
                          />
                        ) : (
                          <Empty />
                        )}
                      </TabPane>

                      <TabPane tab="TAC Torax" key="2">
                        {data.evolution.chestCt ? (
                          <ClinicalStudy
                            type={data.evolution.chestCtPathological}
                            description={data.evolution.chestCtDescription}
                          />
                        ) : (
                          <Empty />
                        )}
                      </TabPane>

                      <TabPane tab="ECG" key="3">
                        {data.evolution.electrocardiogram ? (
                          <ClinicalStudy
                            type={data.evolution.electrocardiogramPathological}
                            description={
                              data.evolution.electrocardiogramDescription
                            }
                          />
                        ) : (
                          <Empty />
                        )}
                      </TabPane>

                      <TabPane tab="PCR Covid" key="4">
                        {data.evolution.cReactiveProteinCovid ? (
                          <ClinicalStudy
                            type={
                              data.evolution.cReactiveProteinCovidPathological
                            }
                            description={
                              data.evolution.creactiveProteinCovidDescription
                            }
                          />
                        ) : (
                          <Empty />
                        )}
                      </TabPane>
                    </Tabs>
                  </Panel>
                  <Panel header="OBSERVACIONES" key="5">
                    <p>
                      <strong>Observaciones: </strong>

                      {data.evolution.observation
                        ? data.evolution.observation
                        : "No cargado"}
                    </p>
                  </Panel>
                  {data.system.name === "UTI" && (
                    <Panel header="DATOS UTI" key="6">
                      <p>
                        <strong>ARM: </strong>
                        {data.evolution.arm
                          ? data.evolution.amr + " °C"
                          : "No cargado"}
                      </p>

                      <p>
                        <strong>Descripcion: </strong>

                        {data.evolution.armDescription
                          ? data.evolution.armDescription
                          : "No cargado"}
                      </p>

                      <p>
                        <strong>Traqueostomia: </strong>

                        {data.evolution.tracheostomy
                          ? data.evolution.tracheostomy
                          : "No cargado"}
                      </p>

                      <p>
                        <strong>Vasopresores: </strong>

                        {data.evolution.vasopressors
                          ? data.evolution.vasopressors
                          : "No cargado"}
                      </p>

                      <p>
                        <strong>Descripcion: </strong>
                        {data.evolution.vasopressorsDescription
                          ? data.evolution.vasopressorsDescription
                          : "No cargado"}
                      </p>
                    </Panel>
                  )}
                </Collapse>
                {
                  data.evolution.userid === DBUser.id && (
                    <Button type="primary">EDITAR</Button>
                  ) //falta preguntar si esta habilitada la edicion
                }
              </Col>
            </Row>
          )
        )}
      </Content>
    </Layout>
  );
};

export default Evolution;
