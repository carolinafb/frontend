import React, { Fragment, useState } from "react";
import { Form, Select, Switch, Radio, InputNumber } from "antd";

const RespiratorySystemForm = ({ form }) => {
  const { Option } = Select;
  const [O2suplementary, setO2suplementary] = useState(true);
  const [O2suplementaryType, setO2suplementaryType] = useState(
    "nasalOxygenCannula"
  );
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
      <Form.Item
        label="Mecanica ventilatoria:"
        name="ventilatoryMechanics"
        rules={[{ required: true, message: "Campo obligatorio" }]}
      >
        <Select initialValues="Buena" style={{ width: 120 }}>
          <Option value="Buena">Buena</Option>
          <Option value="Regular">Regular</Option>
          <Option value="Mala">Mala</Option>
        </Select>
      </Form.Item>
      <Form.Item
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
      </Form.Item>
      {O2suplementary && (
        <Fragment>
          <Form.Item
            label="Tipo:"
            name="type"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Radio.Group
              initialValues={"nasalOxygenCannula"}
              onChange={(e) => {
                setO2suplementaryType(e.target.value);
              }}
            >
              <Radio value="nasalOxygenCannula">Canula Nasal</Radio>
              <Radio value="maskWithReservoir">Mascara con reservorio</Radio>
            </Radio.Group>
          </Form.Item>
          {O2suplementaryType === "nasalOxygenCannula" ? (
            <Form.Item
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
            </Form.Item>
          ) : (
            <Form.Item
              label="%O2:"
              name="maskValue"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <InputNumber min={0} max={100} step={0.1} />
            </Form.Item>
          )}
          <Form.Item
            label="Saturacion de O2:"
            name="oxygenSaturation"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
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
          </Form.Item>
          {PaFi && (
            <Form.Item
              label="PaFi valor:"
              name="pafiValue"
              rules={[{ required: true, message: "Campo obligatorio" }]}
            >
              <InputNumber min={0} max={100} />
            </Form.Item>
          )}

          <Form.Item
            label="Tos:"
            name="cough"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Switch defaultChecked />
          </Form.Item>
          <Form.Item
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
          </Form.Item>
          <Form.Item
            label="Estabilidad/Desaparicion de sintomas respiratorios::"
            name="respiratorySymptoms"
            rules={[{ required: true, message: "Campo obligatorio" }]}
          >
            <Switch defaultChecked />
          </Form.Item>
        </Fragment>
      )}
    </Form>
  );
};
export default RespiratorySystemForm;
