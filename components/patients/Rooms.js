import React from "react";
import { List, Typography, Divider ,Table, Space, Collapse, Button} from 'antd';
const { Panel } = Collapse;

const Rooms = ({info}) => {
  return <div>
<Collapse accordion>


{info && info.map((room, index) => (
                <Panel header={room.name} key={`room${index}`}>



      <Table dataSource={room.beds} pagination={false}>
    <Table title="Bed Name" dataIndex="name" key="firstName" />
    <Table
      title="name"
      dataIndex="patient"
      key="patient"
      render={patient => ( <p> {patient.name} </p>
      )}
    />
    <Table
      title="lastname"
      dataIndex="patient"
      key="patient"
      render={patient => ( <p> {patient.lastname} </p>
      )}
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
  </div>;
};
export default Rooms;