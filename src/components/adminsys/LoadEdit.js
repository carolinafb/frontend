import React, { useContext } from "react";
import { useState } from "react";
import axiosInstance from "../axios";
import getConfig from "next/config";
import { Button, Modal, Form, Input, Radio } from "antd";
import { useRouter } from "next/router";
import { UserContext } from "../../contexts/UserContext";

const CreateForm = ({
  visible,
  onCreate,
  onCancel,
  titulo,
  systemId,
  roomId,
  bedId,
}) => {
  const router = useRouter();
  const { apiEndPoint } = useContext(UserContext);

  const [name, setName] = useState(null);
  const [form] = Form.useForm();

  const onChange = (e) => {
    setName({ ...(name ? name : {}), [e.target.name]: e.target.value });
  };

  const onFinish = () => {
    const nombre = name.itemName;
    console.log(
      "antes",
      titulo,
      "nombre",
      nombre,
      "bedid",
      bedId,
      systemId,
      roomId
    );

    if (titulo == "Agregar sistema") {
      axiosInstance
        .post(apiEndPoint + "/system", {
          nombre: nombre,
        })
        .then((res) => {
          router.push(res.data.redirect);
        });
    }
    if (titulo == "Agregar sala") {
      axiosInstance
        .post(apiEndPoint + "/room", {
          nombre: nombre,
          systemId: systemId,
        })
        .then((res) => {
          router.push(res.data.redirect);
        });
    }
    if (titulo == "Agregar cama") {
      axiosInstance
        .post(apiEndPoint + "/bed", {
          nombre: nombre,
          roomId: roomId,
        })
        .then((res) => {
          router.push(res.data.redirect);
        });
    }
    if (titulo == "Modificar sistema") {
      axiosInstance
        .put(apiEndPoint + "/system", {
          value: nombre,
          systemId: systemId,
          key: "name",
        })
        .then((res) => {
          router.push(res.data.redirect);
        });
    }
    if (titulo == "Modificar sala") {
      console.log(roomId);
      axiosInstance
        .put(apiEndPoint + "/room", {
          nombre: nombre,
          roomId: roomId,
        })
        .then((res) => {
          router.push(res.data.redirect);
        });
    }
    if (titulo == "Modificar cama") {
      axiosInstance
        .put(apiEndPoint + "/bed", {
          nombre: nombre,
          bedId: bedId,
        })
        .then((res) => {
          router.push(res.data.redirect);
        });
    }
  };
  const onFinishFailed = () => {
    console.log("el boton funciona pero no se cargo bien el formilario");
  };

  return (
    <Modal
      visible={visible}
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
