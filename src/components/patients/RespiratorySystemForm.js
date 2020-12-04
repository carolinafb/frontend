import React, { Fragment, useState } from "react";
import { Form, Select, Switch, Radio, InputNumber } from "antd";
import FormItem from "antd/lib/form/FormItem";

const RespiratorySystemForm = ({ form }) => {
  const [O2suplementary, setO2suplementary] = useState(true);
  const [O2suplementaryType, setO2suplementaryType] = useState(true);
  const [PaFi, setPaFi] = useState(true);
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ width: "100%" }}
      name="respiratorySystemForm"
      initialValues={{
        remember: true,
      }}
    >
      <FormItem
        label="Mecanica ventilatoria:"
        name="ventilatoryMechanics"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Select defaultValue="Buena" style={{ width: 120 }}>
          <Option value="Buena">Buena</Option>
          <Option value="Regular">Regular</Option>
          <Option value="Mala">Mala</Option>
        </Select>
      </FormItem>
      <FormItem
        label="Requiere O2 suplementario:"
        name="requiresSupplementalOxygen"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Switch
          defaultChecked
          onChange={() => {
            setO2suplementary(!O2suplementary);
          }}
        />
      </FormItem>
      {O2suplementary && (
        <Fragment>
          <FormItem
            label="Tipo:"
            name="type"
            rules={[{ required: true, message: "Campo obligatorio" }]}
            onChange={() => {
              //setO2suplementaryType(value);
              console.log("se seleccionno:", value);
            }}
          >
            <Radio.Group>
              <Radio value="nasalOxygenCannula">Canula Nasal</Radio>
              <Radio value="maskWithReservoir">Mascara con reservorio</Radio>
            </Radio.Group>
          </FormItem>
          {O2suplementaryType === "nasalOxygenCannula" ? (
            <FormItem
              label="lts/min:"
              name="lts/min"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <Radio.Group>
                <Radio value={1}>1</Radio>
                <Radio value={2}>2</Radio>
                <Radio value={3}>3</Radio>
                <Radio value={4}>4</Radio>
                <Radio value={5}>5</Radio>
                <Radio value={6}>6</Radio>
              </Radio.Group>
            </FormItem>
          ) : (
            <FormItem
              label="%O2:"
              name="maskValue"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <InputNumber min={0} max={100} step={0.1} />
            </FormItem>
          )}
          <FormItem
            label="Saturacion de O2:"
            name="oxygenSaturation"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <InputNumber min={0} max={100} />
          </FormItem>
          <FormItem
            label="PaFi:"
            name="pafi"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Switch
              defaultChecked
              onChange={() => {
                setPaFi(!PaFi);
              }}
            />
          </FormItem>
          {PaFi && (
            <FormItem
              label="PaFi valor:"
              name="pafiValue"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <InputNumber min={0} max={100} />
            </FormItem>
          )}

          <FormItem
            label="Tos:"
            name="cough"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Switch defaultChecked />
          </FormItem>
          <FormItem
            label="Disnea:"
            name="dyspnoea"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Radio.Group>
              <Radio value={1}>1</Radio>
              <Radio value={2}>2</Radio>
              <Radio value={3}>3</Radio>
              <Radio value={4}>4</Radio>
            </Radio.Group>
          </FormItem>
          <FormItem
            label="Estabilidad/Desaparicion de sintomas respiratorios::"
            name="respiratorySymptoms"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Switch defaultChecked />
          </FormItem>
        </Fragment>
      )}
    </Form>
  );
};
export default RespiratorySystemForm;
