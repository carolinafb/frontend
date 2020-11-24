import React from "react";
import { Table, Typography, Space, Collapse, Button } from "antd";
import { useRouter } from "next/router";
const { Panel } = Collapse;
const { Text } = Typography;

const RoomsSystem = ({ rooms }) => {
  const router = useRouter();
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
          {record["patient_name"] ? (
            <p>
              {record["patient_name"]} {record["patient_last_name"]}
            </p>
          ) : (
            <Text type="success">Libre</Text>
          )}
        </Space>
      ),
      key: "patient_last_name",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (text, record) => (
        <Space size="middle">
          {record["patient_id"] && (
            <Button
              type="primary"
              onClick={() => {
                router.push("/internment/" + record["patientId"]);
              }}
              type="primary"
            >
              Ver
            </Button>
          )}
          {record["patient_id"] && <Button type="primary">Asignar</Button>}
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
                scroll={{ x: 500 }}
              ></Table>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};

export default RoomsSystem;
