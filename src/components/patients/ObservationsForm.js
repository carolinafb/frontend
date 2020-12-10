import React from "react";
import { Input, Form } from "antd";

const ObservationsForm = ({ form }) => {
  const { TextArea } = Input;
  const values = {
    remember: true,
  };

  return (
    <Form
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      name="ObservationForm"
      initialValues={{ values }}
    >
      <Form.Item label="Obervaciones: " name="observation">
        <TextArea placeholder="Leve descripcion" style={{ width: "100%" }} />
      </Form.Item>
    </Form>
  );
};

export default ObservationsForm;
