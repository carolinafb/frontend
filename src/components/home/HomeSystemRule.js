import React from "react";
import { Switch } from "antd";
import { Card } from "antd";

const Home = () => {
  return (
    <div>
      <Card
        title="rule 1"
        extra={
          <Switch checkedChildren="on" unCheckedChildren="off" defaultChecked />
        }
      >
        <p>descripcion de la regla 1</p>
      </Card>

      <Card
        title="rule 2"
        extra={
          <Switch checkedChildren="on" unCheckedChildren="off" defaultChecked />
        }
      >
        <p>descripcion de la regla 2</p>
      </Card>
    </div>
  );
};
export default Home;
