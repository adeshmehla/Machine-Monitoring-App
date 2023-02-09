import React, { useState, useEffect } from "react";
import { Button, Form, Input, Radio, Modal } from "antd";
import { Link } from "react-router-dom";
import styles from "./feature.module.css";
import { ForgotPassword } from "./forgot_password";

export const Login = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [employee_name, setEmployee_name] = useState("");

  useEffect(() => {
    form.setFieldsValue({
      employee_name: "Sam"
    });
  }, []);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const layout = {
  //   labelCol: {
  //     span: 8
  //   },
  //   wrapperCol: {
  //     span: 16
  //   }
  // };

  // const validateMessages = {
  //   required: "${label} is required!",
  //   types: {
  //     email: "${label} is not a valid email!",
  //     number: "${label} is not a valid number!"
  //   },
  //   number: {
  //     range: "${label} must be between ${min} and ${max}"
  //   }
  // };

  const onFinish = (values) => {
    console.log(values, "login Data++++++++++++");
  };

  return (
    <>
      <div className={styles.container}>
        <h2>Login</h2>

        <Form
          form={form}
          className={styles.form_container}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600
          }}
          // validateMessages={validateMessages}
        >
          <Form.Item name={["user", "designation"]} label="Your Designation">
            <Radio.Group>
              <Radio.Button value="Supervisor">Supervisor</Radio.Button>
              <Radio.Button value="Machanic">Machanic</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={["user", "card_number"]} label="Card Number">
            <Input />
          </Form.Item>
          <Form.Item name={["user", "employee_name"]} label="Employee Name">
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "password"]}
            label="Your Password"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 1
            }}
          >
            <Button
              className={styles.feature_btn}
              type="primary"
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form.Item>
        </Form>
        <p className={styles.feature_footer_link}>
          <Link
            className={styles.link_class}
            onClick={showModal}
            to="/forgot_password"
          >
            Forgot Password?
          </Link>
          <Link className={styles.link_class} to="/signup">
            Signup
          </Link>
        </p>

        <Modal
          width={320}
          title="Reset Password Using Email"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <ForgotPassword />
        </Modal>
      </div>
    </>
  );
};
