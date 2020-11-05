import React from "react";
import { Table, Space, Collapse } from "antd";
const { Panel } = Collapse;

const Rooms = ({ info }) => {
  return (
    <div>
      <Collapse accordion>
        {info &&
          info.map((room, index) => (
            <Panel header={room.name} key={`room${index}`}>
              <Table dataSource={room.patients} pagination={false}>
                <Table title="Bed Name" dataIndex="bed_name" key="firstName" />
                <Table
                  title="name"
                  dataIndex="patient_name"
                  key="patient_name"
                />
                <Table
                  title="lastname"
                  dataIndex="patient_last_name"
                  key="patient_last_name"
                />
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
export default Rooms;
