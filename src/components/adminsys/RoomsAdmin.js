import React from "react";
import { Table, Space, Collapse  } from "antd";
const { Panel } = Collapse;

const RoomsAdmin = ({ rooms }) => {
  return (
    <div>
    <Collapse accordion>
      {rooms &&
        rooms.map((room, index) => (
          <Panel header={room.room_name} key={`room${index}`}>
            <Table dataSource={room.beds} pagination={false}>
              <Table title="Bed Name" dataIndex="bed_name" key="firstName" />
          
              <Table
                title="Action"
                key="action"
                render={(text, record) => (
                  <Space size="middle">
                    <a>Invite</a>
                    <a>Delete</a>
                  </Space>
                )}
              />
            </Table>
          </Panel>
        ))}
    </Collapse>
  </div>
      
  );
};
export default RoomsAdmin;