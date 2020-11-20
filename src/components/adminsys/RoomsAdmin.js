import React from "react";
import { useState } from "react";
import { Table, Button, Row, Col, Space, Collapse } from "antd";
import CreateForm from "./CreateUpdateForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axiosInstance from "../axios";
const { Panel } = Collapse;

const RoomsAdmin = ({ rooms, refreshData }) => {
  const [visible, setVisible] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [bedId, setBedId] = useState(null);
  const [systemId, setSystemId] = useState(null);
  const [titulo, setTitulo] = useState(false);
  const [path, setPath] = useState(false);
  const [action, setAction] = useState(false);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };
  const onDeleteRoom = (roomId) => {
    axiosInstance
      .delete("/room", {
        data: { roomId },
      })
      .then((res) => {
        refreshData();
      });
  };

  const onDeleteBed = (bedId) => {
    axiosInstance
      .delete("/bed", {
        data: { bedId },
      })
      .then((res) => {
        refreshData();
      });
  };

  const columns = [
    {
      title: "Cama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Borrar",
      key: "Borrar",
      render: (text, record) => (
        <Space size="middle">
          {record["patientId"] ? (
            <p>Asignada</p>
          ) : (
              <Button
                onClick={() => {
                  onDeleteBed(record.id);
                }}
                type="danger"
              >
                <DeleteOutlined />
              </Button>
            )}
        </Space>
      ),
    },
    {
      title: "Modificar",
      key: "Modificar",
      render: (text, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setVisible(true);
              setBedId(record.id);
              setTitulo("Modificar cama");
              setAction("update");
              setPath("cama");
            }}
            type="primary"
          >
            <EditOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <CreateForm
        roomId={roomId}
        systemId={systemId}
        bedId={bedId}
        titulo={titulo}
        visible={visible}
        path={path}
        action={action}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Collapse accordion>
        {rooms &&
          rooms.map((room, index) => (
            <Panel
              header={
                <div>
                  <Row gutter={8}>
                    <Col className="gutter-row" span={12}>
                      <div>
                        <h2>{room.name}</h2>
                      </div>
                    </Col>
                    <Col className="gutter-row" span={4}>
                      <div>
                        {room.beds.length === 0 ? (
                          <Button
                            onClick={() => {
                              onDeleteRoom(room.id);
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
                            setRoomId(room.id);
                            setTitulo("Modificar sala");
                            setAction("update");
                            setPath("sala");
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
              key={`room${index}`}
            >
              <Table
                dataSource={room.beds}
                pagination={false}
                columns={columns}
                scroll={{ x: 200 }}
              ></Table>
              <footer>
                <div className="align-column-center margin__big">
                  <Button
                    onClick={() => {
                      setVisible(true);
                      setRoomId(room.id);
                      setTitulo("Agregar cama");
                      setAction("create");
                      setPath("cama");
                    }}
                    type="primary"
                  >
                    {" "}
                    Agregar cama
                  </Button>
                </div>
              </footer>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default RoomsAdmin;
