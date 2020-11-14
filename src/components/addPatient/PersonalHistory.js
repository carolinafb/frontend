import React from "react";
import { Input, Form } from "antd";

const PersonalHistory = ({ form }) => {
  const { TextArea } = Input;
  return (
    <div className="align-column-center2">
      <Form
        layout="vertical"
        form={form}
        style={{ width: "100%" }}
        name="backgroundClinical"
        initialValues={{
          remember: true,
          background_clinical: null,
        }}
      >
        <Form.Item label="Antecedentes personales: " name="background_clinical">
          <TextArea
            placeholder="Leve descripcion de los antecedentes personales"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default PersonalHistory;
