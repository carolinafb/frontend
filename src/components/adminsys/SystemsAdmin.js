import React, { useContext } from "react";
import { useState } from "react";
import Rooms from "../../components/adminsys/RoomsAdmin";
import CreateForm from "./LoadEdit";
import axiosInstance from "../axios";

import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import {
  Row,
  Typography,
  Button,
  Switch,
  Col,
  Progress,
  Space,
  Collapse,
} from "antd";
const { Panel } = Collapse;

const { Text } = Typography;
const orange = 45;
const red = 75;

const Systems = ({ systems }) => {
  const [visible, setVisible] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [systemId, setSystemId] = useState(0);
  const [titulo, setTitulo] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const router = useRouter();
  const { apiEndPoint } = useContext(UserContext);

  const onDeleteSystem = (systemId) => {
    axiosInstance
      .delete(apiEndPoint + "/system", {
        data: { systemId },
      })
      .then((res) => {
        router.push(res.data.redirect);
      });
  };

  const onChangeInfinitBedsOfSystem = (systemId, infinitBeds) => {
    console.log("antes", systemId, infinitBeds);

    axiosInstance
      .put(apiEndPoint + "/system", {
        value: infinitBeds,
        systemId: systemId,
        key: "infinitBeds",
      })
      .then((res) => {
        router.push(res.data.redirect);
      });
  };

  return (
    <div>
      <Collapse accordion>
        {systems &&
          systems.map((system, index) => (
            <Panel
              header={
                <div>
                  <Row gutter={8}>
                    <Col className="gutter-row" span={12}>
                      <div>
                        <h1>{system.name}</h1>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div>
                        {system.retirable == true &&
                        system.rooms.length == 0 ? (
                          <Button
                            onClick={() => {
                              onDeleteSystem(system.id);
                            }}
                            type="danger"
                          >
                            <DeleteOutlined />
                          </Button>
                        ) : (
                          <p></p>
                        )}
                      </div>
                    </Col>

                    <Col className="gutter-row" span={4}>
                      <div>
                        <Button
                          onClick={() => {
                            setVisible(true);
                            setSystemId(system.id);
                            setTitulo("Modificar sistema");
                          }}
                          type="primary"
                        >
                          <EditOutlined />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </div>
              }
              key={`system${index}`}
            >
              <header>
                <Collapse accordion>
                  <Panel header="Informacion general">
                    {system.name == "GUARDIA" ? (
                      <div>
                        <div className="align-column-center margin__small">
                          <Row gutter={[24, 1]}>
                            <Col className="gutter-row" span={12}>
                              <div>Porcentaje ocupacional</div>
                            </Col>

                            <Col className="gutter-row" span={12}>
                              <div>Camas infinitas</div>
                            </Col>
                          </Row>
                        </div>

                        <div className="align-column-center margin__middle">
                          <Row gutter={[96, 1]}>
                            <Col className="gutter-row" span={10}>
                              <div>
                                <Space size="middle">
                                  {system.occupancy >= red ? (
                                    system.occupancy == 100 ? (
                                      <Progress
                                        type="circle"
                                        percent={system.occupancy}
                                        strokeColor="red"
                                        width={40}
                                        status="exception"
                                      />
                                    ) : (
                                      <Progress
                                        type="circle"
                                        percent={system.occupancy}
                                        strokeColor="red"
                                        width={40}
                                      />
                                    )
                                  ) : system.occupancy >= orange ? (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy}
                                      strokeColor="orange"
                                      width={40}
                                    />
                                  ) : (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy}
                                      strokeColor="green"
                                      width={40}
                                    />
                                  )}
                                </Space>
                              </div>
                            </Col>

                            <Col className="gutter-row" span={8}>
                              <div>
                                <Switch
                                  checked={system.infinitBeds === 1}
                                  checkedChildren="on"
                                  unCheckedChildren="off"
                                  onClick={() => {
                                    system.infinitBeds === 1
                                      ? onChangeInfinitBedsOfSystem(
                                          system.id,
                                          0
                                        )
                                      : onChangeInfinitBedsOfSystem(
                                          system.id,
                                          1
                                        );
                                  }}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ) : (
                      <div className="align-column-center margin__middle">
                        <Row gutter={22}>
                          <Col className="gutter-row" span={12}>
                            <div>Porcentaje ocupacional</div>
                          </Col>

                          <Col className="gutter-row" span={12}>
                            <div>
                              <Space size="middle">
                                {system.occupancy >= red ? (
                                  system.occupancy == 100 ? (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy}
                                      strokeColor="red"
                                      width={40}
                                      status="exception"
                                    />
                                  ) : (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy}
                                      strokeColor="red"
                                      width={40}
                                    />
                                  )
                                ) : system.occupancy >= orange ? (
                                  <Progress
                                    type="circle"
                                    percent={system.occupancy}
                                    strokeColor="orange"
                                    width={40}
                                  />
                                ) : (
                                  <Progress
                                    type="circle"
                                    percent={system.occupancy}
                                    strokeColor="green"
                                    width={40}
                                  />
                                )}
                              </Space>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    )}

                    <div className="align-column-center margin__big">
                      <Row gutter={2}>
                        <Col className="gutter-row" span={12}>
                          <Button
                            className="align-column-left margin__small"
                            type="primary"
                          >
                            Editar jefe
                          </Button>
                        </Col>

                        <Col className="gutter-row" span={12}>
                          <Button
                            className="align-column-rigth margin__small"
                            type="primary"
                          >
                            Agregar medico
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </Collapse>
              </header>
              <div></div>
              <Rooms rooms={system.rooms} />
              <footer>
                <div className="align-column-center margin__big">
                  <Button
                    onClick={() => {
                      setVisible(true);
                      setSystemId(system.id);
                      setTitulo("Agregar sala");
                    }}
                    type="primary"
                  >
                    Agregar sala
                  </Button>
                </div>
              </footer>
            </Panel>
          ))}
      </Collapse>
      <footer>
        <div className="align-column-center margin__big">
          <CreateForm
            roomId={roomId}
            systemId={systemId}
            titulo={titulo}
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />

          <Button
            onClick={() => {
              setVisible(true);
              setTitulo("Agregar sistema");
            }}
            type="primary"
          >
            Agregar sistema
          </Button>
        </div>
      </footer>
    </div>
  );
};
export default Systems;
