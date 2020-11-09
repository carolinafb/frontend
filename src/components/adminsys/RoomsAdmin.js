import React from "react";
import { useState } from "react";
import { Table,Button, Space, Collapse  } from "antd";
import CreateForm from "../../components/adminsys/Load";
const { Panel } = Collapse;

const RoomsAdmin = ({ rooms }) => {
   const [visible, setVisible] = useState(false);
   const [roomId, setRoomId] = useState(null);
   const [systemId, setSystemId] = useState(null);
   const [titulo, setTitulo] = useState(false);
   const onCreate = (values) => {
     console.log("Received values of form: ", values);
     setVisible(false);
   };

  const columns = [
    {
      title: "Cama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (text, record) => (
        <Space size="middle">
          {(record["patientId"])?  <p>Asignada</p> : <Button type="danger">Borrar</Button> }

          
        </Space>
      ),
    },
  ];

  return (
    <div>
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
      <Collapse accordion>
        {rooms &&
          rooms.map((room, index) => (
            <Panel header={room.name} key={`room${index}`}>
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
                      setSystemId(null);
                      setTitulo("Agregar cama");
                    }}
                    type="primary"
                  >
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