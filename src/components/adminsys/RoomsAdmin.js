import React from "react";
import { Table,Button, Space, Collapse  } from "antd";
const { Panel } = Collapse;

const RoomsAdmin = ({ rooms }) => {
  const columns = [
    {
      title: "Cama",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Acciones",
      key: "Acciones",
      render: (text, record) => (
        <Space size="middle">
          {(record["patientId"])?  <p>Asignada</p> : <Button type="danger">Borrar</Button> }

          
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Collapse accordion>
        {rooms &&
          rooms.map((room, index) => (
            <Panel header={room.name} key={`room${index}`}>
              <Table
                dataSource={room.beds}
                pagination={false}
                columns={columns}
                scroll={{ x: 200 }}
              ></Table>
              <footer>
              <div className="align-column-center margin__big">
                <Button type="primary">Agregar cama</Button>
                </div>  
              </footer>
            </Panel>
          ))}
      </Collapse>
    </div>
  );
};
export default RoomsAdmin;