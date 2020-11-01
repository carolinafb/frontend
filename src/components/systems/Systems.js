import React from "react";
import Rooms from "../../components/systems/RoomsSystem";
import { Table, Space, Collapse  } from "antd";
const { Panel } = Collapse;

const Systems = ({ systems }) => {
  return (
      <div>
      <Collapse accordion>
        {systems &&
          systems.map((system, index) => (
            <Panel header={system.system_name} key={`system${index}`}>
          
            <Rooms rooms={system.rooms} />
            </Panel>
          )
          
          )}
      </Collapse>

     
    </div>
      
  );
};
export default Systems;
