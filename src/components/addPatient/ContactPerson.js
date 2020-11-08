import React from "react";
import { Form, Input } from "antd";

const ContactPerson = () => {
  return (
    <div className="align-column-center2">
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          name="apellido"
          label="Apellido:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el apellido!",
            },
          ]}
        >
          <Input placeholder="Apellido" />
        </Form.Item>
        <Form.Item
          name="nombre"
          label="Nombre:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre!",
            },
          ]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          name="parentesco"
          label="Parentesco/Relacion:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la relacion!",
            },
          ]}
        >
          <Input placeholder="Parentesco/Relacion" />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su numero de telefono!",
            },
          ]}
        >
          <Input placeholder="Telefono" />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ContactPerson;
