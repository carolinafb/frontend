import React from "react";
import { Form, Switch } from "antd";

const SymptomsForm = ({ form }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      name="SymptomsForm"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label="Somnolencia:"
        name="Drowsiness"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item
        label="Anosmia:"
        name="Anosmia"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item
        label="Disgeusia:"
        name="Dysgeusia"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch defaultChecked />
      </Form.Item>
    </Form>
  );
};

export default SymptomsForm;
