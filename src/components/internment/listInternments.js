import React, { useState, useEffect, useContext, Fragment } from "react";
import axiosInstance from "../axios";
import { Modal, Table, Space, Button } from "antd";
import { UserContext } from "../../contexts/Context";
import { useRouter } from "next/router";

const CreateInternments = ({
  internmentsVisible,
  onReturnInternments,
  onCancelInternments,
  patientId,
}) => {
  const [err, setErr] = useState(false);
  const router = useRouter();
  const [internments, setInternments] = useState(null);
  const { DBUser } = useContext(UserContext);

  /////////////////////////////////////

  useEffect(() => {
    if (patientId) {
      axiosInstance
        .get("/internment/all", {
          params: {
            patientId: patientId,
          },
        })
        .then((res) => {
          setErr(false);
          setInternments(res.data);
        })
        .catch((e) => {
          setErr(e.message);
          setInternments(null);
        });
    }
  }, [patientId]);
  //////////////////////////////////////////////
  const columns = [
    {
      title: "Fecha de ingreso",
      key: "dateOfHospitalization",
      render: (text, record) => (
        <Space size="middle">
          {record["dateOfHospitalization"].slice(0, -14)}
        </Space>
      ),
    },
    {
      title: "Fecha de egreso",
      key: "egressDate",
      render: (text, record) => (
        <Space size="middle">
          {record["egressDate"]
            ? record["egressDate"].slice(0, -14)
            : "------------"}
        </Space>
      ),
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (text, record) => (
        <Space size="middle">
          {record["obitoDate"] || record["egressDate"] ? (
            <Button
              onClick={() => {
                router.push("/internment/" + record["id"]);
                onReturnInternments();
              }}
              type="primary"
            >
              Ver
            </Button>
          ) : (
            <Button
              onClick={() => {
                router.push("/internment/" + record["id"]);
                onReturnInternments();
              }}
              type="primary"
            >
              Ver actual
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <Modal
      visible={internmentsVisible}
      title="internaciones"
      onCancel={onCancelInternments}
      onOk={onCancelInternments}
      footer={[
        <Button key="back" onClick={onCancelInternments}>
          volver
        </Button>,
      ]}
    >
      {internments && (
        <Table
          dataSource={internments.internments}
          pagination={false}
          columns={columns}
          scroll={{ x: 470 }}
        ></Table>
      )}
    </Modal>
  );
};
export default CreateInternments;
