import React from "react";
import { Form, Input } from "antd";

const ContactPerson = () => {
  const [contactPerson, setContactPerson] = React.useState({});
  const onChange = (e) => {
    setContactPerson({
      ...contactPerson,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="align-column-center2">
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        name="contactPerson"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Apellido:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el apellido!",
            },
          ]}
        >
          <Input placeholder="Apellido" name="lastName" onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Nombre:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese el nombre!",
            },
          ]}
        >
          <Input placeholder="Nombre" name="name" onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Parentesco/Relacion:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la relacion!",
            },
          ]}
        >
          <Input
            placeholder="Parentesco/Relacion"
            name="relationship"
            onChange={onChange}
          />
        </Form.Item>
        <Form.Item
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su numero de telefono!",
            },
          ]}
        >
          <Input placeholder="Telefono" name="phone" onChange={onChange} />
        </Form.Item>
      </Form>
    </div>
  );
};
export default ContactPerson;
