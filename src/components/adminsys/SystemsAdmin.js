import React from "react";
import { useState } from "react";
import Rooms from "../../components/adminsys/RoomsAdmin";
import CreateForm from "./CreateUpdateForm";
import CreateFormChangeSystemChief from "../../components/doctors/changeSystemChief";
import axiosInstance from "../axios";
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

const Systems = ({ systems, refreshData }) => {
  const [visible, setVisible] = useState(false);
  const [roomId, setRoomId] = useState(0);
  const [systemId, setSystemId] = useState(0);
  const [titulo, setTitulo] = useState(false);
  const [path, setPath] = useState(false);
  const [action, setAction] = useState(false);
  const [clave, setClave] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    refreshData();
    setVisible(false);
  };

  /////////////////////////////////
  const [systemChiefVisible, setVisibleSystemChief] = useState(false);

  const onCreateSystemChief = () => {
    setVisibleSystemChief(false);
  };

  ///////////////////////

  const onDeleteSystem = (systemId) => {
    axiosInstance
      .delete("/system", {
        data: { systemId },
      })
      .then((res) => {
        refreshData();
      });
  };

  const onChangeInfinitBedsOfSystem = (systemId, infinitBeds) => {
    console.log("antes", systemId, infinitBeds);
    axiosInstance
      .put("/system", {
        nombre: infinitBeds,
        systemId: systemId,
        clave: "infinitBeds", // nombre y clave deberían estar en inglés
      })
      .then((res) => {
        refreshData();
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
                  </Row>
                </div>
              }
              key={`system${index}`}
            >
              <header>
                <Collapse accordion>
                  <Panel header={<strong>Informacion general</strong>}>
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
                                        percent={system.occupancy.toFixed(2)}
                                        strokeColor="red"
                                        width={40}
                                        status="exception"
                                      />
                                    ) : (
                                      <Progress
                                        type="circle"
                                        percent={system.occupancy.toFixed(2)}
                                        strokeColor="red"
                                        width={40}
                                      />
                                    )
                                  ) : system.occupancy >= orange ? (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy.toFixed(2)}
                                      strokeColor="orange"
                                      width={40}
                                    />
                                  ) : (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy.toFixed(2)}
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
                                      percent={system.occupancy.toFixed(2)}
                                      strokeColor="red"
                                      width={40}
                                      status="exception"
                                    />
                                  ) : (
                                    <Progress
                                      type="circle"
                                      percent={system.occupancy.toFixed(2)}
                                      strokeColor="red"
                                      width={40}
                                    />
                                  )
                                ) : system.occupancy >= orange ? (
                                  <Progress
                                    type="circle"
                                    percent={system.occupancy.toFixed(2)}
                                    strokeColor="orange"
                                    width={40}
                                  />
                                ) : (
                                  <Progress
                                    type="circle"
                                    percent={system.occupancy.toFixed(2)}
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
                            onClick={() => {
                              setSystemId(system.id);
                              setVisibleSystemChief(true);
                            }}
                            type="primary"
                          >
                            Cambiar jefe
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
              <Rooms rooms={system.rooms} refreshData={refreshData} />
              <footer>
                <div className="align-column-center margin__big">
                  <Button
                    onClick={() => {
                      setVisible(true);
                      setSystemId(system.id);
                      setTitulo("Agregar sala");
                      setAction("create");
                      setPath("sala");
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
            action={action}
            path={path}
            clave={clave}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
          <CreateFormChangeSystemChief
            systemChiefVisible={systemChiefVisible}
            onCreateSystemChief={onCreateSystemChief}
            systemId={systemId}
            onCancelSystemChief={() => {
              setVisibleSystemChief(false);
            }}
          />
        </div>
      </footer>
    </div>
  );
};
export default Systems;

/* 

agregar systema
 <Button
            display="none"
            onClick={() => {
              setVisible(true);
              setTitulo("Agregar sistema");
              setAction("create");
              setPath("sistema");
            }}
            type="primary"
          >
            Agregar sistema
          </Button>


editar y eliminar systema en el encabezado del desplegable


 <Col className="gutter-row" span={4}>
                      <div>
                        {system.removable ? (
                          <Button
                            onClick={() => {
                              onDeleteSystem(system.id);
                            }}
                            type="danger"
                          >
                            <DeleteOutlined />
                          </Button>
                        ) : (
                          <Button disabled={true} type="danger">
                            <DeleteOutlined />
                          </Button>
                        )}
                      </div>
                    </Col>

                    <Col className="gutter-row" span={4}>
                      {system.removable == true ? (
                        <div>
                          <Button
                            onClick={() => {
                              setVisible(true);
                              setSystemId(system.id);
                              setTitulo("Modificar sistema");
                              setAction("update");
                              setPath("sistema");
                              setClave("name");
                            }}
                            type="primary"
                          >
                            <EditOutlined />
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Button disabled={true} type="primary">
                            <EditOutlined />
                          </Button>
                        </div>
                      )}
                    </Col>




*/
