import React from "react";
import { Button, Form, Input, Radio } from "antd";
import { Link } from "react-router-dom";

import styles from "./feature.module.css";
export const Signup = () => {
  // const [error, setError] = useState("");

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

  const onFinish = async (value) => {
    console.log(value, "Signuppppppp");
  };

  return (
    <div className={styles.container}>
      <h2>Sign Up</h2>

      <Form
        className={styles.form_container}
        layout="vertical"
        // {...layout}
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
        <Form.Item
          name={["user", "name"]}
          label="Name"
          rules={[
            {
              type: "name"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "email_address"]}
          label="Email"
          rules={[
            {
              type: "email"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={["user", "password"]}
          label="Password"
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
            Register
          </Button>
        </Form.Item>
        <p className={styles.feature_footer_link}>
          <span>Already have an account?</span>
          <Link className={styles.link_class} to="/login">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};
