import React from "react";
import { Table, Button, Space, Collapse,Timeline, Radio } from "antd";
import { useState } from 'react';
const { Panel } = Collapse;

const Rooms = ({ rooms }) => {
 

  return (
    <div>
      <Collapse accordion>
        {rooms &&
          rooms.map((room, index) => (
            <Panel header={room.name} key={`room${index}`}>
              <Table
                dataSource={room.patients}
                pagination={false}
                columns={columns}
                scroll={{ x: 470 }}
              ></Table>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default Rooms;










import { useState } from 'react';
import { Timeline, Radio } from 'antd';

function TimelimeLabelDemo() {
  const [mode, setMode] = useState('left');

  const onChange = e => {
    setMode(e.target.value);
  };

  return (
    <>
      <Radio.Group
        onChange={onChange}
        value={mode}
        style={{
          marginBottom: 20,
        }}
      >
        <Radio value="left">Left</Radio>
        <Radio value="right">Right</Radio>
        <Radio value="alternate">Alternate</Radio>
      </Radio.Group>
      <Timeline mode={mode}>
        <Timeline.Item label="2015-09-01">Create a services</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">Solve initial network problems</Timeline.Item>
        <Timeline.Item>Technical testing</Timeline.Item>
        <Timeline.Item label="2015-09-01 09:12:11">Network problems being solved</Timeline.Item>
      </Timeline>
    </>
  );
}

ReactDOM.render(<TimelimeLabelDemo />, mountNode);
Create a services site 2015-09-01
Create a services site 2015-09-01
Solve initial network problems 1

Solve initial network problems 2

Solve initial network problems 3 2015-09-01

Technical testing 1

Technical testing 2

Technical testing 3 2015-09-01

Technical testing 1

Technical testing 2

Technical testing 3 2015-09-01

Technical testing 1

Technical testing 2

Technical testing 3 2015-09-01

Color
Set the color of circles. green means completed or success status, red means warning or error, and blue means ongoing or other default status, gray for unfinished or disabled status.

Create a services site 2015-09-01
Solve initial network problems 2015-09-01
Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
Network problems being solved 2015-09-01
Create a services site 2015-09-01
Technical testing 2015-09-01
Alternate
Alternate timeline.

Create a services site 2015-09-01
Solve initial network problems 2015-09-01
Technical testing 2015-09-01
Network problems being solved 2015-09-01
Right alternate
Right alternate timeline.

