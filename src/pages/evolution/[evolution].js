import Navbar from "../../components/header/Navbar";
import {
  Divider,
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
                <Divider orientation="left">
                  Evolucion: {data.evolution.createTime}
                </Divider>
                <Title level={4}>{data.name + " " + data.lastName}</Title>
                <Collapse accordion>
                  <Panel header="SIGNOS VITALES" key="1">
                    <label>
                      <strong>Temperatura: </strong>
                    </label>
                    {data.evolution.temperature
                      ? data.evolution.temperature
                      : "No cargado"}{" "}
                    °C
                    <br />
                    <label>
                      <strong>TA Sistolica: </strong>
                    </label>
                    {data.evolution.systolicBloodPressure
                      ? data.evolution.systolicBloodPressure
                      : "No cargado"}{" "}
                    mmHg
                    <br />
                    <label>
                      <strong>TA Diastolica: </strong>
                    </label>
                    {data.evolution.diastolicBloodPressure
                      ? data.evolution.diastolicBloodPressure
                      : "No cargado"}{" "}
                    mmHg
                    <br />
                    <label>
                      <strong>FC: </strong>
                    </label>
                    {data.evolution.heartRate
                      ? data.evolution.heartRate
                      : "No cargado"}
                    lpm
                    <br />
                    <label>
                      <strong>FR: </strong>
                    </label>
                    {data.evolution.breathingFrequency
                      ? data.evolution.breathingFrequency
                      : "No cargado"}{" "}
                    rpm
                    <br />
                  </Panel>
                  <Panel header="SISTEMA RESPIRATORIO" key="2">
                    <label>
                      <strong>Mecanica ventilatoria: </strong>
                    </label>
                    {data.evolution.ventilatoryMechanics
                      ? data.evolution.ventilatoryMechanics
                      : "No cargado"}
                    <br />
                    <label>
                      <strong>Requiere O2 suplementario: </strong>
                    </label>
                    {data.evolution.requiresSupplementalOxygen
                      ? data.evolution.requiresSupplementalOxygen
                      : "No cargado"}
                    <br />
                    <label>
                      <strong>Tipo: </strong>
                    </label>
                    {data.evolution.nasalOxygenCannula
                      ? data.evolution.nasalOxygenCannula
                      : "No cargado"}
                    :{" "}
                    {data.evolution.litersPerMinute &&
                      data.evolution.litersPerMinute}{" "}
                    lts/min
                    <br />
                    {data.evolution.maskWithReservoir
                      ? data.evolution.maskWithReservoir
                      : "No cargado"}
                    : {data.evolution.maskValue && data.evolution.maskValue} %O2
                    <br />
                    <label>
                      <strong>Saturacion de O2: </strong>
                    </label>
                    {data.evolution.oxygenSaturation
                      ? data.evolution.oxygenSaturation
                      : "No cargado"}
                    %
                    <br />
                    <label>
                      <strong>PaFi: </strong>
                    </label>
                    {data.evolution.pafi ? data.evolution.pafi : "No cargado"}{" "}
                    {data.evolution.pafiValue
                      ? data.evolution.pafiValue
                      : "No cargado"}{" "}
                    mmHg
                    <br />
                    <label>
                      <strong>Tos: </strong>
                    </label>
                    {data.evolution.cough ? data.evolution.cough : "No cargado"}{" "}
                    <br />
                    <label>
                      <strong>Disnea: </strong>
                    </label>
                    {data.evolution.dyspnoea
                      ? data.evolution.dyspnoea
                      : "No cargado"}{" "}
                    <br />
                    <label>
                      <strong>
                        Estabilidad/desaparicion de sintomas respiratorios:
                      </strong>
                    </label>
                    {data.evolution.respiratorySymptoms
                      ? data.evolution.respiratorySymptoms
                      : "No cargado"}{" "}
                    <br />
                  </Panel>
                  <Panel header="OTROS SINTOMAS" key="3">
                    <label>
                      <strong>Somnolencia: </strong>
                    </label>
                    {data.evolution.drowsiness
                      ? data.evolution.drowsiness
                      : "No cargado"}{" "}
                    <br />
                    <label>
                      <strong>Anosmia: </strong>
                    </label>
                    {data.evolution.anosmia
                      ? data.evolution.anosmia
                      : "No cargado"}{" "}
                    <br />
                    <label>
                      <strong>Disgeusia: </strong>
                    </label>
                    {data.evolution.disagreement
                      ? data.evolution.disagreement
                      : "No cargado"}{" "}
                    <br />
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
                          "vacio"
                        )}
                      </TabPane>

                      <TabPane tab="TAC Torax" key="2">
                        {data.evolution.chestCt ? (
                          <ClinicalStudy
                            type={data.evolution.chestCtPathological}
                            description={data.evolution.chestCtDescription}
                          />
                        ) : (
                          "vacio"
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
                          "vacio"
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
                          "vacio"
                        )}
                      </TabPane>
                    </Tabs>
                  </Panel>
                  <Panel header="OBSERVACIONES" key="5">
                    <label>
                      <strong>Observaciones: </strong>
                    </label>
                    {data.evolution.observation
                      ? data.evolution.observation
                      : "No cargado"}
                  </Panel>
                  <Panel header="DATOS UTI" key="6">
                    <label>
                      <strong>ARM: </strong>
                    </label>
                    {data.evolution.arm ? data.evolution.amr : "No cargado"} °C
                    <br />
                    <label>
                      <strong>Descripcion: </strong>
                    </label>
                    {data.evolution.armDescription
                      ? data.evolution.armDescription
                      : "No cargado"}
                    <br />
                    <label>
                      <strong>Traqueostomia: </strong>
                    </label>
                    {data.evolution.tracheostomy
                      ? data.evolution.tracheostomy
                      : "No cargado"}
                    <br />
                    <label>
                      <strong>Vasopresores: </strong>
                    </label>
                    {data.evolution.vasopressors
                      ? data.evolution.vasopressors
                      : "No cargado"}
                    <br />
                    <label>
                      <strong>Descripcion: </strong>
                    </label>
                    {data.evolution.vasopressorsDescription
                      ? data.evolution.vasopressorsDescription
                      : "No cargado"}{" "}
                    <br />
                  </Panel>
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
