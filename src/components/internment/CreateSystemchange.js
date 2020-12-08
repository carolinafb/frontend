import React, { useState, useEffect, useContext, Fragment } from "react";
import axiosInstance from "../axios";
import { Modal, Select, Button, Result, Form } from "antd";
import { UserContext } from "../../contexts/Context";
import { useRouter } from "next/router";

const CreateForm = ({ visible, onCreate, onCancel, patientId }) => {
  const [visibility, setVisibility] = useState(visible);
  const [rooms, setRooms] = useState(null);
  const [err, setErr] = useState(false);
  const router = useRouter();
  const [allowedSystems, setAllowedSystems] = useState(null);
  const [validRooms, setValidRooms] = useState(false);
  const { DBUser } = useContext(UserContext);
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
          setAllowedSystems(res.data.allowedSystems);
        })
        .catch((e) => {
          setErr(e.message);
          setAllowedSystems(null);
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
      systemName: values.system,
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
        returnHome();
        setVisibility(false);
      });
  };

  const roomsWithSpace = (system) => {
    axiosInstance
      .get("/rooms/WithSpace", {
        params: {
          systemName: system,
        },
      })
      .then((res) => {
        setErr(false);
        setRooms(res.data.rooms);
        setValidRooms(res.data.validRooms);
      })
      .catch((e) => {
        setErr(e.message);
        setRooms(null);
      });
  };

  const returnHome = () => {
    if (DBUser && DBUser.role == "DOCTOR") {
      router.push("/patients");
    } else {
      router.push("/systems");
    }
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
            onCreate(values);
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
        {allowedSystems && (
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
              {allowedSystems.map((element, index) => {
                return (
                  <Option selected={index === 0} value={element} key={index}>
                    {element}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}

        {rooms && validRooms === true && (
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
        {rooms && validRooms === false && (
          <div>No hay camas disponibles en este momento</div>
        )}
      </Form>
    </Modal>
  );
};

export default CreateForm;
