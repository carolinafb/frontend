import React, { Fragment } from "react";
import { Collapse, Button } from "antd";
const { Panel } = Collapse;

const Home = () => {
  const text = ` A
      dog is a type of domesticated animal. Known for its loyalty and
      faithfulness, it can be found as a welcome guest in many households across
      the world. `;
  return (
    <Fragment>
      <Collapse accordion>
        <Panel header="GUARDIA" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="UTI" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="PISO COVID" key="3">
          <p>{text}</p>
        </Panel>
        <Panel header="HOTEL" key="4">
          <p>{text}</p>
        </Panel>
        <Panel header="DOMICILIO" key="5">
          <p>{text}</p>
        </Panel>
      </Collapse>
      <div className="align-column-center margin__big">
        <Button type="primary">AGREGAR SISTEMA</Button>
      </div>
    </Fragment>
  );
};
export default Home;
