import React from "react";
import { Input, Form } from "antd";

const PersonalHistory = () => {
  const { TextArea } = Input;
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
          label="Antecedentes personales: "
          name="antecedenteslabel"
          rules={[{ required: true, message: "Ingrese el DNI de la persona" }]}
        >
          <TextArea
            placeholder="Leve descripcion de los antecedentes personales"
            name="antecedentesPersonales"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default PersonalHistory;
