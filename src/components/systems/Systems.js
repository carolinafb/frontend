import React from "react";
import Rooms from "../../components/systems/RoomsSystem";
import { Row, Typography, Col, Table, Progress, Space, Collapse } from "antd";
const { Panel } = Collapse;

const { Text } = Typography;
const orange = 45;
const red = 75;

const Systems = ({ systems }) => {
  return (
    <div>
      <Collapse accordion>
        {systems &&
          systems.map((system, index) => (
            <Panel
              header={
                <div>
                  <h1>{system.name}</h1>

                  <Row gutter={[8, 8]}>
                    <Col className="gutter-row" span={6}>
                      <div>Camas libres</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div>Camas ocupadas</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div>Camas totales</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div>Porcentaje</div>
                    </Col>

                    <Col className="gutter-row" span={6}>
                      <div>
                        <Space size="middle">
                          {system.occupancy >= red ? (
                            <Text type="danger">{system.freeBeds}</Text>
                          ) : system.occupancy >= orange ? (
                            <Text type="warning">{system.freeBeds}</Text>
                          ) : (
                            <Text type="success">{system.freeBeds}</Text>
                          )}
                        </Space>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div>{system.ocupedBeds}</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
                      <div>{system.totalBeds}</div>
                    </Col>
                    <Col className="gutter-row" span={6}>
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
              }
              key={`system${index}`}
            >
              <Rooms rooms={system.rooms} systemId={system.id} />
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default Systems;
