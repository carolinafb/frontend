import React, { useRef } from "react";
import { Form, Input } from "antd";

const VitalSignsForm = ({ form }) => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Temperatura"
        name="temperature"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la temperatura!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="TA sistólica"
        name="systolicBloodPressure"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la TA sistólica!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="TA diastolica"
        name="diastolicBloodPressure"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la TA diastolica!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Frecuencia Cardíaca"
        name="heartRate"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la Frecuencia Cardíaca!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Frecuencia Respiratoria"
        name="breathingFrequency"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la Frecuencia Respiratoria!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
    </Form>
  );
};

export default VitalSignsForm;
