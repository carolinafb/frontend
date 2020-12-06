import React from "react";
import { Input, Form } from "antd";

const ObservationsForm = ({ form }) => {
  const { TextArea } = Input;
  return (
    <Form
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      name="ObservationForm"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item label="Obervaciones: " name="observations">
        <TextArea placeholder="Leve descripcion" style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  );
};

export default ObservationsForm;
