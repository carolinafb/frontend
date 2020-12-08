import React, { Fragment, useState, useContext } from "react";
import { Form, Select, Switch, Radio, InputNumber } from "antd";
import { UserContext } from "src/contexts/Context";

const RespiratorySystemForm = ({ form }) => {
  const { Option } = Select;
  const { lastEvolution } = useContext(UserContext);
  const values = {
    remember: true,
  };

  const initialValues = () => {
    if (lastEvolution != null) {
      if (lastEvolution.ventilatoryMechanics != null)
        values.ventilatoryMechanics = lastEvolution.ventilatoryMechanics;

      if (lastEvolution.requiresSupplementalOxygen != null)
        values.requiresSupplementalOxygen =
          lastEvolution.requiresSupplementalOxygen;

      if (lastEvolution.nasalOxygenCannula != null) {
        values.type = "nasalOxygenCannula";
        if (lastEvolution.litersPerMinute != null)
          values.litersPerMinute = lastEvolution.litersPerMinute;
        values.maskWithReservoir = null;
        values.maskValue = null;
      } else {
        if (lastEvolution.maskWithReservoir != null) {
          values.type = "maskWithReservoir";
          if (lastEvolution.maskValue != null)
            values.maskValue = lastEvolution.maskValue;
          values.nasalOxygenCannula = null;
          values.litersPerMinute = null;
        }
      }

      if (lastEvolution.maskWithReservoir != null)
        values.type = "maskWithReservoir";

      if (lastEvolution.oxygenSaturation != null)
        values.oxygenSaturation = lastEvolution.oxygenSaturation;

      if (lastEvolution.pafi != null) {
        values.pafi = lastEvolution.pafi;
      }

      if (lastEvolution.pafiValue != null)
        values.pafiValue = lastEvolution.pafiValue;

      if (lastEvolution.respiratorySymptoms != null)
        values.respiratorySymptoms = lastEvolution.respiratorySymptoms;

      if (lastEvolution.dyspnoea != null)
        values.dyspnoea = lastEvolution.dyspnoea;
    }
    console.log("vaaaaalueeessss", values);
    return values;
  };

  const [O2suplementary, setO2suplementary] = useState(
    lastEvolution != null
      ? lastEvolution.requiresSupplementalOxygen === 1
      : false
  );
  const [O2suplementaryType, setO2suplementaryType] = useState(
    lastEvolution != null
      ? lastEvolution.maskWithReservoir === 1
        ? "maskWithReservoir"
        : lastEvolution.nasalOxygenCannula === 1
        ? "nasalOxygenCannula"
        : null
      : false
  );
  const [PaFi, setPaFi] = useState(
    lastEvolution != null ? lastEvolution.pafi === 1 : false
  );

  return (
    <Fragment>
      {lastEvolution != false && (
        <Form
          form={form}
          layout="vertical"
          style={{ width: "100%" }}
          name="respiratorySystemForm"
          initialValues={lastEvolution ? initialValues() : { values }}
        >
          <Form.Item label="Mecanica ventilatoria:" name="ventilatoryMechanics">
            <Select style={{ width: 120 }}>
              <Option value="Buena">Buena</Option>
              <Option value="Regular">Regular</Option>
              <Option value="Mala">Mala</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Requiere O2 suplementario:"
            name="requiresSupplementalOxygen"
          >
            <Switch
              defaultChecked={
                lastEvolution != null
                  ? lastEvolution.requiresSupplementalOxygen === 1
                  : undefined
              }
              onChange={() => {
                setO2suplementary(!O2suplementary);
              }}
            />
          </Form.Item>

          {O2suplementary === true && (
            <Fragment>
              <Form.Item label="Tipo:" name="type">
                <Radio.Group
                  onChange={(e) => {
                    console.log("se selecciono:", e.target.value);
                    setO2suplementaryType(e.target.value);
                  }}
                >
                  <Radio
                    defaultChecked={
                      lastEvolution != null
                        ? lastEvolution.nasalOxygenCannula === 1
                        : undefined
                    }
                    value="nasalOxygenCannula"
                  >
                    Canula Nasal
                  </Radio>
                  <Radio
                    defaultChecked={
                      lastEvolution != null
                        ? lastEvolution.maskWithReservoir === 1
                        : undefined
                    }
                    value="maskWithReservoir"
                  >
                    Mascara con reservorio
                  </Radio>
                </Radio.Group>
              </Form.Item>
              {O2suplementaryType === "nasalOxygenCannula" && (
                <Form.Item label="lts/min:" name="litersPerMinute">
                  <Radio.Group>
                    <Radio value={1}>1</Radio>
                    <Radio value={2}>2</Radio>
                    <Radio value={3}>3</Radio>
                    <Radio value={4}>4</Radio>
                    <Radio value={5}>5</Radio>
                    <Radio value={6}>6</Radio>
                  </Radio.Group>
                </Form.Item>
              )}

              {O2suplementaryType === "maskWithReservoir" && (
                <Form.Item label="%O2:" name="maskValue">
                  <InputNumber min={0} max={100} step={0.1} />
                </Form.Item>
              )}
              <Form.Item label="Saturacion de O2:" name="oxygenSaturation">
                <InputNumber min={0} max={100} />
              </Form.Item>
              <Form.Item label="PaFi:" name="pafi">
                <Switch
                  defaultChecked={
                    lastEvolution != null ? lastEvolution.pafi === 1 : undefined
                  }
                  onChange={() => {
                    setPaFi(!PaFi);
                  }}
                />
              </Form.Item>
              {PaFi != null && (
                <Form.Item label="PaFi valor:" name="pafiValue">
                  <InputNumber min={0} max={100} />
                </Form.Item>
              )}

              <Form.Item label="Tos:" name="cough">
                <Switch
                  defaultChecked={
                    lastEvolution != null
                      ? lastEvolution.cough === 1
                      : undefined
                  }
                />
              </Form.Item>
              <Form.Item label="Disnea:" name="dyspnoea">
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
              >
                <Switch
                  defaultChecked={
                    lastEvolution != null
                      ? lastEvolution.respiratorySymptoms === 1
                      : undefined
                  }
                />
              </Form.Item>
            </Fragment>
          )}
        </Form>
      )}
    </Fragment>
  );
};
export default RespiratorySystemForm;
