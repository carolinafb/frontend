import React from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";

const AffiliateData = () => {
  const onChange = (e) => {};

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
          label="Ingrese el DNI: "
          name="dniLabel"
          rules={[{ required: true, message: "Ingrese el DNI de la persona" }]}
        >
          <InputNumber
            placeholder="DNI"
            name="dni"
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Fecha de Nacimiento:"
          name="fechaDeNacimiento"
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
          name="direccion"
          label="Direccion:"
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
        <Form.Item
          label="Email"
          name="itemName"
          rules={[{ required: true, message: "Ingrese el email!" }]}
        >
          <Input name="email" placeholder="Email" onChange={onChange} />
        </Form.Item>
        <Form.Item
          name="obraSocial"
          label="Obra social"
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
    </div>
  );
};
export default AffiliateData;
