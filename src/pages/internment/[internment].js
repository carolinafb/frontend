import Navbar from "../../components/header/Navbar";
import CreateSystemchange from "../../components/internment/CreateSystemchange";
import CreateFormAssingDoctors from "../../components/doctors/AssingDoctors";
import {
  Divider,
  Button,
  Layout,
  Result,
  Timeline,
  Row,
  Col,
  Collapse,
  Typography,
} from "antd";
import React, { useState, useEffect, useContext, Fragment } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../components/axios";
import { UserContext } from "../../contexts/Context";
const { Panel } = Collapse;

const internment = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const [err, setErr] = useState(false);
  const { DBUser } = useContext(UserContext);

  const [data, setData] = useState(null);

  const [visible, setVisible] = useState(false);

  const [doctorVisible, setVisibleDoctor] = useState(false);
  const onCreateDoctor = () => {
    setVisibleDoctor(false);
  };

  useEffect(() => {
    if (router.query.internment) {
      axiosInstance
        .get("/internment", {
          params: {
            id: router.query.internment,
          },
        })
        .then((res) => {
          setErr(false);
          setData(res.data);
        })
        .catch((e) => {
          setErr(e.message);
          setData(null);
        });
    }
  }, [router.query.internment]);

  const onCreate = () => {
    refreshData();
    setVisible(false);
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
        ) : data === null ? (
          <div></div>
        ) : (
          /////////////////////////////
          <Fragment>
            {console.log({ data })}
            <div>
              <div className="align-column-center margin__small">
                <h2>
                  {"  Paciente:  " +
                    data.internmentData.patient.name +
                    " " +
                    data.internmentData.patient.lastName}
                </h2>
              </div>
              <Row gutter={[16, 4]}>
                <Col className="gutter-row" span={8}>
                  <div className="align-column-center margin__small">
                    <h3>Sistema</h3>
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="align-column-center margin__small">
                    <h3>Sala</h3>
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="align-column-center margin__small">
                    <h3>Cama</h3>
                  </div>
                </Col>

                <Col className="gutter-row" span={8}>
                  <div className="align-column-center margin__small">
                    {data.internmentData.location.systemName}
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="align-column-center margin__small">
                    {data.internmentData.location.roomName}
                  </div>
                </Col>
                <Col className="gutter-row" span={8}>
                  <div className="align-column-center margin__small">
                    {data.internmentData.location.bedName}
                  </div>
                </Col>
              </Row>
            </div>
            <Collapse accordion>
              <Panel header={<h2>Datos de la internación </h2>}>
                <p>
                  Fecha de inicio de los sintomas:
                  {" " + data.internmentData.dateOfSymptoms.slice(0, -14)}
                </p>
                <p>
                  Fecha de diagnostico:
                  {" " + data.internmentData.dateOfDiagnosis.slice(0, -14)}
                </p>
                <p>
                  Fecha de Hospitalizacion:
                  {" " +
                    data.internmentData.dateOfHospitalization.slice(0, -14)}
                </p>
                <p>Comorbilidades: {data.internmentData.historyOfDisease}</p>
              </Panel>
              <Panel header={<h2>Cambio de sistemas con evoluciones</h2>}>
                {data.internmentData.systemChanges === null ? (
                  <div>No hay cambios de sistemna </div>
                ) : (
                  <div>
                    <div className="align-column-center margin__big">
                      {DBUser &&
                      DBUser.systemId ===
                        data.internmentData.location.systemId ? (
                        <Button
                          onClick={() => {
                            setVisible(true);
                          }}
                          type="primary"
                        >
                          Cambiar de sistema
                        </Button>
                      ) : (
                        <div></div>
                      )}
                    </div>

                    <Timeline>
                      {data.internmentData.systemChanges &&
                        data.internmentData.systemChanges.map(
                          (systemChange, index) => (
                            <Timeline.Item color="blue">
                              <div>
                                <Row gutter={4}>
                                  <Col className="gutter-row" span={12}>
                                    <div>
                                      <h2>{systemChange.systemName}</h2>
                                    </div>
                                  </Col>
                                  <Col className="gutter-row" span={12}>
                                    <div>
                                      <h2>
                                        {systemChange.createTime.slice(0, -14) +
                                          " " +
                                          systemChange.createTime.slice(11, -8)}
                                      </h2>
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <Collapse accordion>
                                <Panel
                                  header={
                                    <div>
                                      <Row gutter={4}>
                                        <Col className="gutter-row" span={6}>
                                          <div>
                                            <h3>Evaluaciones</h3>
                                          </div>
                                        </Col>

                                        <Col className="gutter-row" span={10}>
                                          {index === 0 &&
                                            DBUser &&
                                            DBUser.systemId ===
                                              data.internmentData.location
                                                .systemId && (
                                              <div>
                                                <Button
                                                  /*   onClick={() => {
                                      
                                                }}
                                            */
                                                  type="primary"
                                                >
                                                  Agregar evolucion
                                                </Button>
                                              </div>
                                            )}
                                        </Col>
                                        <Col className="gutter-row" span={4}>
                                          {index === 0 &&
                                            DBUser &&
                                            DBUser.systemId ===
                                              data.internmentData.location
                                                .systemId &&
                                            DBUser.role ===
                                              "JEFE DE SISTEMA" && (
                                              <div>
                                                <Button
                                                  onClick={() => {
                                                    setVisibleDoctor(true);
                                                  }}
                                                  type="primary"
                                                >
                                                  Asignar doctores
                                                </Button>
                                              </div>
                                            )}
                                        </Col>
                                      </Row>
                                    </div>
                                  }
                                >
                                  {systemChange.evaluations === null ? (
                                    <div>No hay evoluciones </div>
                                  ) : (
                                    <Timeline>
                                      {systemChange.evaluations &&
                                        systemChange.evaluations.map(
                                          (evaluation) => (
                                            <Timeline.Item color="blue">
                                              <div>
                                                <Row gutter={8}>
                                                  <Col
                                                    className="gutter-row"
                                                    span={12}
                                                  >
                                                    <div>
                                                      <h3>
                                                        {evaluation.createTime.slice(
                                                          0,
                                                          -14
                                                        ) +
                                                          " " +
                                                          evaluation.createTime.slice(
                                                            11,
                                                            -8
                                                          )}
                                                      </h3>
                                                    </div>
                                                  </Col>
                                                  <Col
                                                    className="gutter-row"
                                                    span={12}
                                                  >
                                                    <div>
                                                      <Button
                                                        /*   onClick={() => {
                                      
                                                }}
                                            */
                                                        type="primary"
                                                      >
                                                        Ver mas
                                                      </Button>
                                                    </div>
                                                  </Col>
                                                </Row>
                                              </div>
                                            </Timeline.Item>
                                          )
                                        )}
                                    </Timeline>
                                  )}
                                </Panel>
                              </Collapse>
                            </Timeline.Item>
                          )
                        )}
                    </Timeline>
                  </div>
                )}
              </Panel>
            </Collapse>

            <div className="align-column-center margin__big">
              <CreateSystemchange
                visible={visible}
                onCreate={onCreate}
                patientId={data.internmentData.patientId}
                onCancel={() => {
                  setVisible(false);
                }}
              />
              {DBUser.role == "JEFE DE SISTEMA" && (
                <CreateFormAssingDoctors
                  doctorVisible={doctorVisible}
                  onCreateDoctor={onCreateDoctor}
                  patientId={data.internmentData.patientId}
                  onCancelDoctor={() => {
                    setVisibleDoctor(false);
                  }}
                />
              )}
            </div>
          </Fragment>
          //////////////////////////////////
        )}
      </Content>
    </Layout>
  );
};

export default internment;
