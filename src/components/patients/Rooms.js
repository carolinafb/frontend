import React from "react";
import { Table, Button, Space, Collapse } from "antd";
import { useRouter } from "next/router";

import axiosInstance from "../axios";
const { Panel } = Collapse;

const Rooms = ({ rooms }) => {
  const router = useRouter();
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
          {record["patientId"] && (
            <Button
              onClick={() => {
                router.push("/internment/" + record["patientId"]);
              }}
              type="primary"
            >
              Ver
            </Button>
          )}
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
