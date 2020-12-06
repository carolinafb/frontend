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
        <Input />
      </Form.Item>
      <Form.Item
        label="TA sistólica"
        name="tasistolic"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la TA sistólica!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="TA diastolica"
        name="tadistolic"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la TA diastolica!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="FC"
        name="fc"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la FC!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="FR"
        name="fr"
        rules={[
          {
            required: true,
            message: "Por favor ingresa la FR!",
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default VitalSignsForm;
