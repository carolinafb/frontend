import React from "react";
import { List, Typography, Divider ,Table, Space, Collapse, Button} from 'antd';
const { Panel } = Collapse;

const data = [
    {
       "name":"Sala 1",
       "beds":[
          {
             "name":"Cama 1",
             "patient":{
                "name":"Luciano",
                "lastname":"Pérez Cerra"
             }},
             {
              "name":"Cama 2",
              "patient":{
                 "name":"lucas",
                 "lastname":"Pérez "
              }}
              ,
             {
              "name":"Cama 3",
              "patient":{
                 "name":"juan",
                 "lastname":"martinez "
              }
          }]
        },
          {
             "name":"Sala 2",
             "beds":[
                
             ]
          },
          {
            "name":"Sala 3",
            "beds":[
               {
                  "name":"Cama 1",
                  "patient":{
                     "name":"federico",
                     "lastname":"Cerra"
                  }},
                  {
                   "name":"Cama 2",
                   "patient":{
                      "name":"mario",
                      "lastname":"juarez "
                   }}]
             }
       ]
 
const Rooms = () => {
  return <div>
<Collapse accordion>
{data &&
            data.map((user, index) => (
                <Panel header={user.name} key={`user${index}`}>

      <Table dataSource={user.beds} pagination={false}>
    <Table title="Bed Name" dataIndex="name" key="firstName" />
    <Table title="Name" dataIndex="patient.name" key="Name" />
    <Table title="Last Name" dataIndex="patient.lastname"  key="age" />
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