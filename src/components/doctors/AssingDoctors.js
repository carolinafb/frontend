import React, { useState, useEffect, useContext, Fragment } from "react";
import axiosInstance from "../axios";
import { Modal, Select, Button, Result, Form } from "antd";
import { UserContext } from "../../contexts/Context";
import { useRouter } from "next/router";

const CreateFormAssingDoctors = ({
  doctorVisible,
  onCreateDoctor,
  onCancelDoctor,
  patientId,
}) => {
  const [err, setErr] = useState(false);
  const router = useRouter();
  const [allowedDoctors, setAllowedDoctors] = useState(null);
  const { DBUser } = useContext(UserContext);
  const { Option } = Select;

  const [form] = Form.useForm();
  /////////////////////////////////////
  const onFinish = (values) => {
    const payload = {
      patientId,
      doctors: values.doctors,
    };
    const url = "/doctors";
    const method = "post";
    axiosInstance
      .request({
        method,
        url,
        data: payload,
      })
      .then((res) => {
        returnHome();
      });
  };
  /////////////////////

  useEffect(() => {
    if (patientId) {
      axiosInstance
        .get("/doctors", {
          params: {
            id: patientId,
          },
        })
        .then((res) => {
          setErr(false);
          setAllowedDoctors(res.data.doctors);
        })
        .catch((e) => {
          setErr(e.message);
          setAllowedDoctors(null);
        });
    }
  }, [patientId]);
  ///////////////////////////////////////

  const returnHome = () => {
    if (DBUser && DBUser.role == "DOCTOR") {
      router.push("/patients");
    } else {
      router.push("/systems");
    }
  };

  //////////////////////////////////////////////

  return (
    <Modal
      visible={doctorVisible}
      title="Asignar doctores a un paciente"
      okText="Comfirmar"
      cancelText="Cancelar"
      onCancel={onCancelDoctor}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onFinish(values);
            form.resetFields();
            onCreateDoctor(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        {allowedDoctors && (
          <Form.Item
            name="doctors"
            label="doctors"
            rules={[
              {
                required: true,
                message: "Please select doctors!",
                type: "array",
              },
            ]}
          >
            <Select
              mode="multiple"
              placeholder="Please select doctors to assing"
            >
              {allowedDoctors.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
export default CreateFormAssingDoctors;
