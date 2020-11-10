import React, { useState } from "react";
import { Form, Input, DatePicker, InputNumber } from "antd";

const AffiliateData = () => {
  const dni = 33333333; //la idea que el DNI ya me lo de de la pantalla anterior
  const [affiliateData, setAffiliateData] = React.useState({ dni: 33333333 });
  const onChange = (e) => {
    setAffiliateData({
      ...affiliateData,
      [e.target.name]: e.target.value,
    });
  };
  const addbirthDate = (e, date) => {
    setAffiliateData({
      ...affiliateData,
      birth_date: date,
    });
  };
  return (
    <div className="align-column-center2">
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        name="affiliateData"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Ingrese el DNI: "
          rules={[{ required: true, message: "Ingrese el DNI de la persona" }]}
        >
          <InputNumber
            placeholder="DNI"
            name="dni"
            value={dni}
            onChange={onChange}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Fecha de Nacimiento:"
          rules={[
            {
              required: true,
              message: "Ingrese una fecha.",
            },
          ]}
        >
          <DatePicker
            name="birthDate"
            placeholder="Fecha de nacimiento"
            mode="date"
            style={{ width: "100%" }}
            onChange={addbirthDate}
          />
        </Form.Item>
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
          label="Direccion:"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la direccion!",
            },
          ]}
        >
          <Input placeholder="Direccion" name="direction" onChange={onChange} />
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
        <Form.Item
          label="Email"
          rules={[{ required: true, message: "Ingrese el email!" }]}
        >
          <Input name="email" placeholder="Email" onChange={onChange} />
        </Form.Item>
        <Form.Item
          label="Obra social"
          rules={[
            {
              required: true,
              message: "Por favor ingrese la obra social!",
            },
          ]}
        >
          <Input
            placeholder="Obra social"
            name="socialSecurity"
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default AffiliateData;
