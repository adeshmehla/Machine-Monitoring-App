import React from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
export const Home = () => {
  // const [dataBase, setDataBase] = useState([]);
  const navigate = useNavigate();
  const layout = {
    labelCol: {
      span: 8
    },
    wrapperCol: {
      span: 16
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!"
    },
    number: {
      range: "${label} must be between ${min} and ${max}"
    }
  };

  const onFinish = (values) => {
    // setDataBase(values);
    // values.preventDefaul;
    // localStorage.setItem('items', JSON.stringify([ ...oldData, ...obj ]));

    let oldData = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem("userData", JSON.stringify([...oldData, values.user]));
    console.log(values, "-----------");
    if (values) {
      navigate("/details");
    }
  };
  return (
    <>
      <div className={styles.container}>
        <Button className={styles.home_btn} type="primary">
          First
        </Button>
        <Button className={styles.home_btn} type="primary">
          Second
        </Button>
        <Form
          className={styles.form_container}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          style={{
            maxWidth: 600
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["user", "name"]}
            label="Name"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "machine_id"]}
            label="Machine Id"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["user", "machine_type"]}
            label="Machine Type"
            rules={[
              {
                required: true
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
            name={["user", "age"]}
            label="Age"
            rules={[
              {
                type: "number",
                min: 0,
                max: 99
              }
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item name={["user", "introduction"]} label="Introduction">
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 3
            }}
          >
            <Button
              className={styles.home_btn}
              type="primary"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
