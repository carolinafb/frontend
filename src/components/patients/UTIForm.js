import React, { useContext, useEffect } from "react";
import { Form, Switch, Input } from "antd";
import { UserContext } from "src/contexts/Context";

const UTIForm = ({ form }) => {
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
  return (
    <>
      {lastEvolution != false && (
        <Form
          layout="vertical"
          form={form}
          style={{ width: "100%" }}
          name="UTIForm"
          initialValues={lastEvolution ? initialValues() : { values }}
        >
          <Form.Item
            label="ARM:"
            name="arm"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item label="Descripcion: " name="ARMDescripcion">
            <TextArea
              placeholder="Leve descripcion"
              style={{ width: "100%" }}
            />
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
export default UTIForm;
