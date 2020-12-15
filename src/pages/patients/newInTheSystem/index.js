import React, { useEffect, useState, useContext } from "react";
import { Layout, Table, Button, Typography, Space } from "antd";
import Navbar from "../../../components/header/Navbar";
import CreateFormAssingDoctors from "../../../components/doctors/AssingDoctors";
import { UserContext } from "../../../contexts/Context";
import axiosInstance from "../../../components/axios";

const newInTheSystem = () => {
  const { Header, Content } = Layout;
  const [patients, setPatients] = useState({});
  const { DBUser } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const { Title } = Typography;

  useEffect(() => {
    if (DBUser) {
      axiosInstance
        .get("/patients/ofUser", {})
        .then((res) => {
          setErr(false);
          setPatients(res.data);
        })
        .catch((e) => {
          setErr(e.message);
          setPatients(null);
        });
    }
  }, [DBUser]);

  const [doctorVisible, setVisibleDoctor] = useState(false);
  const onCreateDoctor = () => {
    setVisibleDoctor(false);
  };

  const columns = [
    {
      title: "Paciente",
      render: (record) => (
        <Space size="middle">
          {record["patientName"]} {record["patientLastName"]}
        </Space>
      ),
      key: "patientName",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (record) => (
        <Space size="middle">
          {record["patientId"] && (
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
        </Space>
      ),
    },
  ];

  return (
    <Layout>
      <Header style={{ backgroundColor: "rgb(107, 45, 177)" }}>
        <Navbar user={DBUser} />
      </Header>
      <Content>
        <Title align="center" level={3} style={{ marginTop: "3%" }}>
          Pacientes nuevos en el sistema
        </Title>
        {patients && (
          <div>
            <Table
              dataSource={patients.patients}
              pagination={false}
              columns={columns}
              scroll={{ x: 470 }}
            ></Table>
            <CreateFormAssingDoctors
              doctorVisible={doctorVisible}
              onCreateDoctor={onCreateDoctor}
              patientId={patientId}
              onCancelDoctor={() => {
                setVisibleDoctor(false);
              }}
            />
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default newInTheSystem;
