import React, { Fragment, useState } from "react";
import { Switch, Select, Form, Input } from "antd";

const StudieElementImput = ({ label, name }) => {
  const { Option } = Select;
  const { TextArea } = Input;
  const [selectElement, setSelectElement] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  return (
    <Fragment>
      <Form.Item label={label + ":"} name={name}>
        <Switch
          onChange={() => {
            setSelectElement(!selectElement);
          }}
        />
      </Form.Item>
      {selectElement && (
        <Fragment>
          <Form.Item label="Tipo:" name={name + "Pathological"}>
            <Select
              style={{ width: 120 }}
              onChange={(value) => {
                value == "Patologico"
                  ? setShowDescription(true)
                  : setShowDescription(false);
              }}
            >
              <Option value="Normal">Normal</Option>
              <Option value="Patologico">Patologico</Option>
            </Select>
          </Form.Item>
          {showDescription && (
            <Form.Item label="Descripcion: " name={name + "Description"}>
              <TextArea
                placeholder="Leve descripcion"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default StudieElementImput;
