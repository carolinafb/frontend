import React, { useState, useContext } from "react";
import { Table, Typography, Space, Collapse, Button } from "antd";
import { useRouter } from "next/router";
import CreateSystemchange from "../../components/internment/CreateSystemchange";
import CreateFormAssingDoctors from "../../components/doctors/AssingDoctors";
import { UserContext } from "../../contexts/Context";
const { Panel } = Collapse;
const { Text } = Typography;

const RoomsSystem = ({ rooms, systemId }) => {
  const router = useRouter();
  const [patientId, setPatientId] = useState(null);
  const { DBUser } = useContext(UserContext);

  ///////////////////////
  const [visible, setVisible] = useState(false);
  const onCreate = () => {
    setVisible(false);
  };
  /////////////////////////////////
  const [doctorVisible, setVisibleDoctor] = useState(false);
  const onCreateDoctor = () => {
    setVisibleDoctor(false);
  };

  ///////////////////////
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
          {record["patientName"] ? (
            <p>
              {record["patientName"]} {record["patientLastName"]}
            </p>
          ) : (
            <Text type="success">Libre</Text>
          )}
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
              type="primary"
              onClick={() => {
                router.push("/internment/" + record["internmentId"]);
              }}
              type="primary"
            >
              Ver
            </Button>
          )}
          {record["patientId"] && systemId === DBUser.systemId && (
            <Button
              onClick={() => {
                setPatientId(record["patientId"]);
                setVisibleDoctor(true);
              }}
              type="primary"
            >
              Asignar doctores
            </Button>
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
        <CreateFormAssingDoctors
          doctorVisible={doctorVisible}
          onCreateDoctor={onCreateDoctor}
          patientId={patientId}
          onCancelDoctor={() => {
            setVisibleDoctor(false);
          }}
        />
      </div>
    </div>
  );
};

export default RoomsSystem;
