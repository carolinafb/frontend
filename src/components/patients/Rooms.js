import React from "react";
import { Table, Button, Space, Collapse } from "antd";
const { Panel } = Collapse;

const Rooms = ({ rooms }) => {
  const columns = [
    {
      title: "Cama",
      dataIndex: "bedName",
      key: "name",
    },
    {
      title: "Paciente",
      render: (text, record) => (

        <Space size="middle">
            {record["patientName"]} {record["patientLastName"]}
        </Space>
      ),
      key: "patientName",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (text, record) => (
        <Space size="middle">
          {record["patientId"] && <Button type="primary">Ver</Button>}
          {record["patientId"] && <Button type="primary">Evolucionar</Button>}
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
                dataSource={room.patients}
                pagination={false}
                columns={columns}
                scroll={{ x: 470 }}
              ></Table>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default Rooms;
