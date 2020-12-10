import React from "react";
import { Form, InputNumber } from "antd";

const VitalSignsForm = ({ form }) => {
  const values = {
    remember: true,
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="basic"
      initialValues={{ values }}
      onFinish={onFinish}
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
        <InputNumber min={0} max={100} step={0.1} />
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
        <InputNumber min={0} max={100} />
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
        <InputNumber min={0} max={100} />
      </Form.Item>

      <Form.Item
        label="Frecuencia Cardíaca"
        name="heartRate"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la FC!",
          },
        ]}
      >
        <InputNumber min={0} max={100} />
      </Form.Item>

      <Form.Item
        label="Frecuencia Respiratoria"
        name="breathingFrequency"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la FR!",
          },
        ]}
      >
        <InputNumber min={0} max={100} />
      </Form.Item>
    </Form>
  );
};

export default VitalSignsForm;
