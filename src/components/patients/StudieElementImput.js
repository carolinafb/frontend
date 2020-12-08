import React, { Fragment, useState, useContext } from "react";
import { Switch, Select, Form, Input } from "antd";
import { UserContext } from "src/contexts/Context";

const StudieElementImput = ({ label, name }) => {
  const { lastEvolution } = useContext(UserContext);
  const { Option } = Select;
  const { TextArea } = Input;
  const [selectElement, setSelectElement] = useState(lastEvolution[name] === 1);
  const [showDescription, setShowDescription] = useState(
    lastEvolution[name + "Description"]
  );
  return (
    <Fragment>
      <Form.Item label={label + ":"} name={name}>
        <Switch
          defaultChecked={lastEvolution[name] === 1}
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
