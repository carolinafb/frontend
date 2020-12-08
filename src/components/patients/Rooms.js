import React, { useState } from "react";
import { Table, Button, Space, Collapse } from "antd";
import { useRouter } from "next/router";
import CreateSystemchange from "../../components/internment/CreateSystemchange";

const { Panel } = Collapse;

const Rooms = ({ rooms }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [patientId, setPatientId] = useState(null);

  const onCreate = () => {
    refreshData();
    setVisible(false);
  };

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
          {record["internmentId"] && (
            <Button
              onClick={() => {
                router.push("/internment/" + record["internmentId"]);
              }}
              type="primary"
            >
              Ver
            </Button>
          )}
          {record["patientId"] && (
            <Button
              type="primary"
              onClick={() => {
                "/patient/" + data.internmentData.patientId + "/evolve";
              }}
            >
              Evolucionar
            </Button>
          )}
          {record["patientId"] && (
            <Button
              onClick={() => {
                setPatientId(record["patientId"]);
                setVisible(true);
              }}
              type="primary"
            >
              Cambiar de sistema
            </Button>
          )}
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
      <div className="align-column-center margin__big">
        <CreateSystemchange
          visible={visible}
          onCreate={onCreate}
          patientId={patientId}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    </div>
  );
};
export default Rooms;
