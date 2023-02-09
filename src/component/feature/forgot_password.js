import React, { useState } from "react";
import { Button, Form, Input } from "antd";
// import { FormItem } from 'formik-antd';
import styles from "./feature.module.css";

export const ForgotPassword = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // const showModal = () => {
  //     setIsModalOpen(true);
  // };

  // const handleOk = () => {
  //     setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //     setIsModalOpen(false);
  // };

  return (
    <>
      <Form className={styles.form_container} name="basic">
        <h2>Reset Password</h2>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!"
            }
          ]}
          // className={styles.forgot_email_input}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 1
          }}
        >
          <Button
            className={`${styles.feature_btn} ${styles.forgot_pass_btn}`}
            type="primary"
          >
            Send Otp
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
