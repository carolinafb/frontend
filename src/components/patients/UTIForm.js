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
      if (lastEvolution.arm != null) values.arm = lastEvolution.arm;
      if (lastEvolution.armDescription != null)
        values.armDescription = lastEvolution.armDescription;
      if (lastEvolution.tracheostomy != null)
        values.tracheostomy = lastEvolution.tracheostomy;
      if (lastEvolution.vasopressors != null)
        values.vasopressors = lastEvolution.vasopressors;
      if (lastEvolution.vasopressorsDescription != null)
        values.vasopressorsDescription = lastEvolution.vasopressorsDescription;
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
          <Form.Item label="ARM:" name="arm">
            <Switch
              defaultChecked={
                lastEvolution != null ? lastEvolution.arm === 1 : undefined
              }
            />
          </Form.Item>
          <Form.Item label="Descripcion: " name="armDescription">
            <TextArea
              placeholder="Leve descripcion"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Traqueotomia:" name="tracheostomy">
            <Switch
              defaultChecked={
                lastEvolution != null
                  ? lastEvolution.tracheostomy === 1
                  : undefined
              }
            />
          </Form.Item>
          <Form.Item label="Varopresores:" name="vasopressors">
            <Switch
              defaultChecked={
                lastEvolution != null
                  ? lastEvolution.vasopressors === 1
                  : undefined
              }
            />
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
