import React, { useState, useContext } from "react";
import { Table, Typography, Space, Collapse, Button } from "antd";
import { useRouter } from "next/router";
import CreateSystemchange from "../../components/internment/CreateSystemchange";
import { UserContext } from "../../contexts/Context";
const { Panel } = Collapse;
const { Text } = Typography;

const RoomsSystem = ({ rooms, systemId }) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const { DBUser } = useContext(UserContext);

  const onCreate = () => {
    refreshData();
    setVisible(false);
  };

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
          {record["patient_id"] && systemId === DBUser.systemId && (
            <Button type="primary">Asignar</Button>
          )}
          {record["patientId"] && systemId === DBUser.systemId && (
            <Button type="primary">Evolucionar</Button>
          )}
          {record["patientId"] && systemId === DBUser.systemId && (
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
                dataSource={room.beds}
                pagination={false}
                columns={columns}
                scroll={{ x: 500 }}
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

export default RoomsSystem;
