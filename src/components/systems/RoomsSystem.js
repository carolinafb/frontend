import React from "react";
import { Table, Space, Collapse, Button } from "antd";
const { Panel } = Collapse;

const RoomsSystem = ({ rooms }) => {
  const columns = [
    {
      title: "Cama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Paciente",
      render: (text, record) => (

        <Space size="middle">
           {record["patient_last_name"]} {record["patient_name"]}{record["patient_name"] ? <p></p>: <p>Vacia</p>}
        </Space>
      ),
      key: "patient_last_name",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (text, record) => (
        <Space size="middle">
          {record["patient_id"] ? <Button type="primary">Ver</Button>: <a/>}
          {record["patient_id"] ? <Button type="primary">Evolucionar</Button>: <a/>
        }
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Collapse accordion>
        {rooms &&
          rooms.map((room, index) => (
            <Panel header={room.name} key={`room${index}`}>
              <Table
                dataSource={room.beds}
                pagination={false}
                columns={columns}
                scroll={{ x: 700 }}
              ></Table>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};

export default RoomsSystem;
