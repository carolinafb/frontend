import React, { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../axios";
import { Modal, Form, Input } from "antd";

const CreateForm = ({
  visible,
  onCreate,
  onCancel,
  titulo,
  systemId,
  roomId,
  bedId,
  path,
  action,
  clave,
}) => {
  const [name, setName] = useState(null);
  const [visibility, setVisibility] = useState(visible);
  useEffect(() => {
    setVisibility(visible);
  }, [visible]);
  // esto no se está usando. ?
  // const [value, setValue] = useState(null);
  const [form] = Form.useForm();

  const onChange = (e) => {
    setName({ ...(name ? name : {}), [e.target.name]: e.target.value });
  };

  const onFinish = (event) => {
    const nombre = name.itemName;
    const payload = {
      nombre,
      systemId, // estos son parametros opcionales, si no se pasan NO quedan
      roomId,
      bedId,
      clave,
    };
    const url =
      path === "sistema" ? "/system" : path === "sala" ? "/room" : "/bed";
    const method = action === "create" ? "post" : "put";
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
  const onFinishFailed = () => {
    console.log("el boton funciona pero no se cargo bien el formilario");
  };

  return (
    <Modal
      visible={visibility}
      title={titulo}
      okText="Comfirmar"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(name);
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
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="Nombre"
          label="Nombre"
          rules={[
            {
              required: true,
              message: "Ingrese un nombre!",
            },
          ]}
        >
          <Input
            name="itemName"
            placeholder="Ingrese el nombre"
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
