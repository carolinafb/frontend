import React from "react";
import { Form, Input } from "antd";

const ContactPerson = ({ form }) => {
  return (
    <div className="align-column-center2">
      <Form
        form={form}
        layout="vertical"
        style={{ width: "100%" }}
        name="contactPerson"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Apellido:"
          name="contactPerson_lastName"
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
          label="Nombre:"
          name="contactPerson_name"
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
          label="Parentesco/Relacion:"
          name="contactPerson_relationship"
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
          label="Phone Number"
          name="contactPerson_phone"
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
