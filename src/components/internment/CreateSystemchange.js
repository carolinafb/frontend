import React, { useState, useEffect } from "react";
import axiosInstance from "../axios";
import { Modal, Select, Button, Form } from "antd";

const CreateForm = ({ visible, onCreate, onCancel, patientId }) => {
  const [visibility, setVisibility] = useState(visible);
  const [rooms, setRooms] = useState(null);
  const [err, setErr] = useState(false);
  const [selecSystems, setSelecSystems] = useState(null);
  const { Option } = Select;

  useEffect(() => {
    if (patientId) {
      axiosInstance
        .get("/systems/WithSpace", {
          params: {
            id: patientId,
          },
        })
        .then((res) => {
          setErr(false);
          setSelecSystems(res.data);
        })
        .catch((e) => {
          setErr(e.message);
          setSelecSystems(null);
        });
    }
  }, [patientId]);

  useEffect(() => {
    setVisibility(visible);
  }, [visible]);

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("system", values.system, "room", values.room);
    const payload = {
      patientId,
      system: values.system,
      room: values.room,
    };
    const url = "/systemChange";
    const method = "post";
    axiosInstance
      .request({
        method,
        url,
        data: payload,
      })
      .then((res) => {
        setVisibility(false);
      });
  };

  const roomsWithSpace = (system) => {
    axiosInstance
      .get("/rooms/WithSpace", {
        params: {
          id: system,
        },
      })
      .then((res) => {
        setErr(false);
        setRooms(res.data);
      })
      .catch((e) => {
        setErr(e.message);
        setRooms(null);
      });
  };

  return (
    <Modal
      visible={visibility}
      title={<h2>Cambio de sistema</h2>}
      okText="Cambiar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
            form.resetFields();
            onCreate();
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="createSystemChange"
        initialValues={{
          remember: true,
        }}
      >
        {selecSystems && (
          <Form.Item
            label="sistemas: "
            name="system"
            rules={[
              {
                required: true,
                message: "Por favor seleccione un sistema!",
              },
            ]}
          >
            <Select onSelect={roomsWithSpace}>
              {selecSystems.systems.map((element) => {
                return (
                  <Option value={element.id} key={element.id}>
                    {element.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
        {rooms && (
          <Form.Item
            label="salas: "
            name="room"
            rules={[
              {
                required: true,
                message: "Por favor seleccione una sala!",
              },
            ]}
          >
            <Select>
              {rooms.map((element) => {
                return (
                  <Option value={element.id} key={element.id}>
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

export default CreateForm;
