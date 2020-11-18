import React, { useContext } from "react";
import { useState } from "react";
import { Table, Icon, Button, Row, Col, Space, Collapse } from "antd";
import CreateForm from "./LoadEdit";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";
import axiosInstance from "../axios";
const { Panel } = Collapse;

const RoomsAdmin = ({ rooms }) => {
  const [visible, setVisible] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [bedId, setBedId] = useState(null);
  const [systemId, setSystemId] = useState(null);
  const [titulo, setTitulo] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setVisible(false);
  };

  const router = useRouter();
  const { apiEndPoint } = useContext(UserContext);

  const onDeleteRoom = (roomId) => {
    axiosInstance
      .delete(apiEndPoint + "/room", {
        data: { roomId },
      })
      .then((res) => {
        router.push(res.data.redirect);
      });
  };

  const onDeleteBed = (bedId) => {
    axiosInstance
      .delete(apiEndPoint + "/bed", {
        data: { bedId },
      })
      .then((res) => {
        router.push(res.data.redirect);
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
