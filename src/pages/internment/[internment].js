import Navbar from "../../components/header/Navbar";
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
  const { Title } = Typography;
  const { DBUser } = useContext(UserContext);
  const [rerender, setRerender] = useState(true);

  const [data, setData] = useState(null);

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
          console.log("f5")
        ) : (
          /////////////////////////////
          <Fragment>
            <div>
              <Row gutter={12}>
                <Col className="gutter-row" span={22}>
                  <div>
                    <Row gutter={12}>
                      <Col className="gutter-row" span={333}>
                        <div>
                          <h2>{data.internmentData.patient.name}</h2>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={12}>
                        <div>
                          <h2>{data.internmentData.patient.lastName}</h2>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col className="gutter-row" span={4}>
                  <div>
                    <Row gutter={8}>
                      <Col className="gutter-row" span={12}>
                        <div>
                          <h2>{data.internmentData.systemName}</h2>
                        </div>
                      </Col>
                      <Col className="gutter-row" span={4}>
                        <div></div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>

            <Collapse accordion>
              <Panel header={<h2>Datos de la internación </h2>}></Panel>
              <Panel header={<h2>Cambio de sistemas con evoluciones</h2>}>
                {data.internmentData.systemChanges === null ? (
                  <div>No hay cambios de sistemna </div>
                ) : (
                  <Timeline>
                    {data.internmentData.systemChanges &&
                      data.internmentData.systemChanges.map(
                        (systemChange, index) => (
                          <Timeline.Item color="blue">
                            <div>
                              <Row gutter={8}>
                                <Col className="gutter-row" span={12}>
                                  <div>
                                    <h2>{systemChange.systemName}</h2>
                                  </div>
                                </Col>
                                <Col className="gutter-row" span={22}>
                                  <div>{systemChange.createTime}</div>
                                </Col>
                                <Col className="gutter-row" span={22}>
                                  {systemChange.finish === null &&
                                  systemChange.systemId ===
                                    systemChange.systemId ? (
                                    <div></div>
                                  ) : (
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
                              </Row>
                            </div>

                            <Collapse accordion>
                              <Panel>
                                {systemChange.evaluations === null ? (
                                  <div>No hay evoluciones </div>
                                ) : (
                                  <Timeline>
                                    {systemChange.evaluations &&
                                      systemChange.evaluations.map(
                                        (evaluation, index) => (
                                          <Timeline.Item color="blue">
                                            <div>
                                              <Row gutter={8}>
                                                <Col
                                                  className="gutter-row"
                                                  span={12}
                                                >
                                                  <div>
                                                    <h2>
                                                      {evaluation.createTime}
                                                    </h2>
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
                )}
              </Panel>
            </Collapse>
          </Fragment>
          //////////////////////////////////
        )}
      </Content>
    </Layout>
  );
};

export default internment;
