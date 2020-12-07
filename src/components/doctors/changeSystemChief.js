import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Modal, Select, Button, Result, Form } from "antd";
import { useRouter } from "next/router";

const CreateFormChangeSystemChief = ({
  systemChiefVisible,
  onCreateSystemChief,
  onCancelSystemChief,
  systemId,
}) => {
  const [err, setErr] = useState(false);
  const router = useRouter();
  const [doctors, setDoctos] = useState(null);
  const { Option } = Select;

  const [form] = Form.useForm();

  useEffect(() => {
    if (systemId) {
      axiosInstance
        .get("/doctors/ofsystem", {
          params: {
            systemId: systemId,
          },
        })
        .then((res) => {
          setErr(false);
          setDoctos(res.data.doctors);
        })
        .catch((e) => {
          setErr(e.message);
          setDoctos(null);
        });
    }
  }, [systemId]);

  const onFinish = (values) => {
    console.log("doctor", values.doctor);
    const payload = {
      systemId,
      doctorId: values.doctor,
    };
    const url = "/doctor/systemChief";
    const method = "put";
    axiosInstance
      .request({
        method,
        url,
        data: payload,
      })
      .then((res) => {});
  };

  return (
    <Modal
      visible={systemChiefVisible}
      title={<h2>Cambiar jefe de sistema</h2>}
      okText="Cambiar"
      cancelText="Cancelar"
      onCancel={onCancelSystemChief}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
            form.resetFields();
            onCreateSystemChief(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="changeSystemChief"
        initialValues={{
          remember: true,
        }}
      >
        {doctors && (
          <Form.Item
            label="doctor"
            name="doctor"
            rules={[
              {
                required: true,
                message: "Por favor seleccione un doctor!",
              },
            ]}
          >
            <Select>
              {doctors.map((element, index) => {
                return (
                  <Option selected={index === 0} value={element.id} key={index}>
                    {element.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateFormChangeSystemChief;
