import React from "react";
import { Switch } from "antd";
import { Card } from "antd";
import axiosInstance from "../../components/axios";

const Rule = ({ data }) => {
  const onChange = (value) => {
    const ruleId = data.id;
    axiosInstance
      .post("/rules", { ruleId, value })
      .then((res) => {
        console.log("res", res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Card
      title={data.name.replace(/_/g, " ")}
      extra={
        <Switch
          onChange={onChange}
          checkedChildren="on"
          unCheckedChildren="off"
          defaultChecked={data.active != null ? data.active === 1 : undefined}
        />
      }
    >
      <p>{data.description.replace(":value", data.parameter)}</p>
    </Card>
  );
};
export default Rule;
