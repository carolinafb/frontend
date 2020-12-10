import React from "react";
import { Form, Switch } from "antd";

const SymptomsForm = ({ form }) => {
  const values = {
    remember: true,
  };

  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      name="SymptomsForm"
      initialValues={{ values }}
    >
      <Form.Item label="Somnolencia:" name="drowsiness">
        <Switch />
      </Form.Item>
      <Form.Item label="Anosmia:" name="anosmia">
        <Switch />
      </Form.Item>
      <Form.Item label="Disgeusia:" name="disagreement">
        <Switch />
      </Form.Item>
    </Form>
  );
};

export default SymptomsForm;
