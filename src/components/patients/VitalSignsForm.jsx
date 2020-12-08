import React, { useContext, useEffect } from "react";
import { Form, Input } from "antd";
import { UserContext } from "src/contexts/Context";

const VitalSignsForm = ({ form }) => {
  const { lastEvolution } = useContext(UserContext);
  const values = {
    remember: true,
  };

  useEffect(() => {
    console.log(lastEvolution);
  }, []);

  const initialValues = () => {
    if (lastEvolution != null) {
      if (lastEvolution.temperature != null)
        values.temperature = lastEvolution.temperature;
      if (lastEvolution.systolicBloodPressure != null)
        values.systolicBloodPressure = lastEvolution.systolicBloodPressure;
      if (lastEvolution.diastolicBloodPressure != null)
        values.diastolicBloodPressure = lastEvolution.diastolicBloodPressure;
      if (lastEvolution.heartRate != null)
        values.heartRate = lastEvolution.heartRate;
      if (lastEvolution.breathingFrequency != null)
        values.breathingFrequency = lastEvolution.breathingFrequency;
    }
    console.log("vaaaaalueeessss", values);
    return values;
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      {lastEvolution != false && (
        <Form
          form={form}
          layout="vertical"
          name="basic"
          initialValues={lastEvolution ? initialValues() : { values }}
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
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="TA sistólica"
            name="systolicBloodPressure"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la TA sistólica!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="TA diastolica"
            name="diastolicBloodPressure"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la TA diastolica!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Frecuencia Cardíaca"
            name="heartRate"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la FC!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Frecuencia Respiratoria"
            name="breathingFrequency"
            rules={[
              {
                required: true,
                message: "Por favor ingresa la FR!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default VitalSignsForm;
