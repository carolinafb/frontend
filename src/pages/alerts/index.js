import React, { useEffect, useState, useContext } from "react";
import { Layout, Table, Button, Typography, Space } from "antd";
import Navbar from "../../components/header/Navbar";
import { UserContext } from "../../contexts/Context";
import axiosInstance from "../../components/axios";
import { useRouter } from "next/router";
const alerts = () => {
  const router = useRouter();
  const { Header, Content } = Layout;
  const [alerts, setAlerts] = useState({});
  const { DBUser } = useContext(UserContext);
  const [err, setErr] = useState(false);
  const [patientId, setPatientId] = useState(null);
  const { Title } = Typography;

  const seeAlert = (alertID) => {
    axiosInstance.put("/alert-seen", {
      id: alertID,
    });
  };
  useEffect(() => {
    if (
      DBUser &&
      (DBUser.role == "DOCTOR" || DBUser.role == "JEFE DE SISTEMA")
    ) {
      axiosInstance
        .get("/alerts/all")
        .then((response) => setAlerts(response.data));
    }
  }, []);

  const columns = [
    {
      title: "Fecha",
      render: (record) => (
        <Space size="middle">
          {record["date"].slice(0, -14) + " " + record["date"].slice(11, -8)}
        </Space>
      ),
      key: "patientName",
    },
    {
      title: "Mensaje",
      render: (record) => <Space size="middle">{record["message"]}</Space>,
      key: "patientName",
    },
    {
      title: "Paciente",
      render: (record) => (
        <Space size="middle">
          {record["name"]} {record["lastName"]}
        </Space>
      ),
      key: "patientName",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (record) => (
        <Space size="middle">
          {record["evaluationId"] && (
            <Button
              onClick={() => {
                router.push("/evolution/" + record["evaluationId"]);
              }}
              type="primary"
            >
              Ver evolucion
            </Button>
          )}
          {record["internmentId"] && (
            <Button
              onClick={() => {
                router.push("/internment/" + record["internmentId"]);
              }}
              type="primary"
            >
              Ver internacion
            </Button>
          )}

          {!record["readByUser"] ? (
            record["alertId"] && (
              <Button
                onClick={() => {
                  seeAlert(record["alertId"]);
                }}
                type="primary"
              >
                Vista
              </Button>
            )
          ) : (
            <Button disabled={true} type="primary">
              Vista
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
          Alertas
        </Title>
        {alerts &&
          (console.log(alerts),
          (
            <div>
              <Table
                dataSource={alerts.alerts}
                pagination={false}
                columns={columns}
                scroll={{ x: 600 }}
              ></Table>
            </div>
          ))}
      </Content>
    </Layout>
  );
};

export default alerts;
