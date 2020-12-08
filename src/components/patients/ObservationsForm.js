import React, { useContext, useEffect } from "react";
import { Input, Form } from "antd";
import { UserContext } from "src/contexts/Context";

const ObservationsForm = ({ form }) => {
  const { TextArea } = Input;
  const { lastEvolution } = useContext(UserContext);
  const values = {
    remember: true,
  };

  useEffect(() => {
    console.log(lastEvolution);
  }, []);

  const initialValues = () => {
    if (lastEvolution != null) {
      if (lastEvolution.observation != null)
        values.observation = lastEvolution.observation;
    }
    console.log("vaaaaalueeessss", values);
    return values;
  };

  return (
    <>
      {lastEvolution != false && (
        <Form
          layout="vertical"
          form={form}
          style={{ width: "100%" }}
          name="ObservationForm"
          initialValues={lastEvolution ? initialValues() : { values }}
        >
          <Form.Item label="Obervaciones: " name="observation">
            <TextArea
              placeholder="Leve descripcion"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ObservationsForm;
