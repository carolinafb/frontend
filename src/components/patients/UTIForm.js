import React from "react";
import { Form, Switch, Input } from "antd";

const UTIForm = ({ form }) => {
  const { TextArea } = Input;
  return (
    <Form
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      name="UTIForm"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label="ARM:"
        name="arm"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item label="Descripcion: " name="ARMDescripcion">
        <TextArea placeholder="Leve descripcion" style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="Traqueotomia:"
        name="tracheostomy"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item
        label="Varopresores:"
        name="vasopressors"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item label="Descripcion: " name="vasopressorsDescription">
        <TextArea placeholder="Leve descripcion" style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  );
};
export default UTIForm;
