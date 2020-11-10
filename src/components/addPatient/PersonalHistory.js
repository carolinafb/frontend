import React, { useState } from "react";
import { Input, Form } from "antd";

const PersonalHistory = () => {
  const { TextArea } = Input;
  const [personalHistoy, setPersonalHistoy] = React.useState({});
  const onChange = (e) => {
    setPersonalHistoy({
      ...personalHistoy,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="align-column-center2">
      <Form
        layout="vertical"
        style={{ width: "100%" }}
        name="backgroundClinical"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Antecedentes personales: "
          rules={[{ required: true, message: "Ingrese el DNI de la persona" }]}
        >
          <TextArea
            placeholder="Leve descripcion de los antecedentes personales"
            name="background_clinical"
            style={{ width: "100%" }}
            onChange={onChange}
          />
        </Form.Item>
      </Form>
    </div>
  );
};
export default PersonalHistory;
