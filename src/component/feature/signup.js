import React,{useState,useEffect} from "react";
import axios from 'axios';
import { Button, Form, Input, Radio } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

import styles from "./feature.module.css";
export const Signup = () => {
  const navigate = useNavigate();
  const initialValue = {
    // name:"",
    card_number:"",
    password:""
  }
  const [signup,setSignup]=useState(initialValue)

  const onFinish = async (value) => {
    console.log(value)
    const{employee_name,card_number,password}=value;
    if(!employee_name || !card_number || !password){
      alert("error66")
    }else{

      axios.post('http://localhost:5000/api/signup',{
        employee_name,
        card_number,
        password,
      }).then(()=>{
        setSignup({employee_name:"",card_number:"",password:""})
       console.log()
      }).catch((err)=>alert(err,'error'));
      setTimeout(()=>{
        navigate('/qrcode');
      },500)
    }
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
        {/* <Form.Item name={["user", "designation"]} label="Your Designation">
          <Radio.Group>
            <Radio.Button value="Supervisor">Supervisor</Radio.Button>
            <Radio.Button value="Machanic">Machanic</Radio.Button>
          </Radio.Group>
        </Form.Item> */}
        <Form.Item
          name="employee_name"
          label="Employee Name"
          rules={[
            {
              type: "Employee Name is required"
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="card_number"
          label="Card Number"
          // rules={[
          //   {
          //     type: "number"
          //   }
          // ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
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
          <Link className={styles.link_class} to="/">
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};
