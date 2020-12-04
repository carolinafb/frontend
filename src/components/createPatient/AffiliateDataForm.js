import React, { useContext } from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";
import { UserContext } from "../../contexts/Context";

const AffiliateData = ({ form }) => {
  const { dniPatient } = useContext(UserContext);
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      name="affiliateData"
      initialValues={{
        remember: true,
        dni: dniPatient,
      }}
    >
      <Form.Item
        label="Ingrese el DNI: "
        name="dni"
        rules={[{ required: true, message: "Ingrese el DNI de la persona" }]}
      >
        <InputNumber placeholder="DNI" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Fecha de Nacimiento:"
        name="birthDate"
        rules={[
          {
            required: true,
            message: "Ingrese una fecha.",
          },
        ]}
      >
        <DatePicker
          placeholder="Fecha de nacimiento"
          style={{ width: "100%" }}
        />
      </Form.Item>
      <Form.Item
        label="Apellido:"
        name="lastName"
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
        name="name"
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
        label="Direccion:"
        name="direction"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la direccion!",
          },
        ]}
      >
        <Input placeholder="Direccion" />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          {
            required: true,
            message: "Por favor ingrese su numero de telefono!",
          },
        ]}
      >
        <Input placeholder="Telefono" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          { required: true, message: "Ingrese el email!" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Obra social"
        name="socialSecurity"
        rules={[
          {
            required: true,
            message: "Por favor ingrese la obra social!",
          },
        ]}
      >
        <Input placeholder="Obra social" />
      </Form.Item>
    </Form>
  );
};
export default AffiliateData;
