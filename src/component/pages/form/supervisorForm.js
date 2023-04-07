import React, { useEffect, useState } from "react";
import { Button, Form, Input,Modal,Select,Space, TimePicker } from "antd";
import {useSelector} from 'react-redux';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import { NotificationConfirmation } from "../notificationConfirmation";
export const SupervisorForm = () => {
  const [open, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const data = useSelector(state=>state.pageReducer.data);
  const mechanic_name = useSelector(state=>state.pageReducer.mechanic_name);
  
 
 
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

  const handleOk = () => {
    setIsOpen(false);
    setTimeout(()=>{
      navigate("/supervisorScanner")
    },500)
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onFinish = (values) => {
    if(values.breakdown_start_time==undefined){
      values.breakdown_start_time = moment().format('YYYY-MM-DD hh:mm:ss')
    }
      // console.log(values, "-----------");
    if (values) {
        localStorage.setItem('breakdown_start_time',moment().format('hh:mm:ss'))
        const {line_number,machine_number,mechanic_name,breakdown_start_time} = values;
        setIsOpen(true);
        axios
        .post('http://localhost:5000/api/supervisor', {
          line_number,machine_number,mechanic_name,breakdown_start_time
        })
        .then((response) => {
          // setPost(response.data);
        }).catch((err)=>alert(err,'error'));
       
      
    }
  };
  const onTimeChange=(time) => {
    console.log(time);
  }
  return (
    <div className={styles.section}>
       {data ? <div className={styles.container}>
       <h2 style={{textAlign:"center"}}>Supervisor</h2>
       
      <Form
      form = {form}
          className={styles.form_container}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
          initialValues={data}
          style={{
            maxWidth: 600
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="line_number"
            label="Line Number"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input  />
          </Form.Item>
          <Form.Item
            name="machine_number"
            label="Machine Number"
            
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input  />
          </Form.Item>
         
          <Form.Item
            name="mechanic_name"
            label="mechanic"
            
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input defaultValue={mechanic_name} />
          </Form.Item>
                <Form.Item
                style={{display:"none"}}
            name="breakdown_start_time"
            label="Breakdown Start Time"
           
          >
         <TimePicker  size="large" disabled/>
          </Form.Item>
          
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 3
            }}
          >
            <Button
              className={styles.submit_btn}
              type="primary"
              htmlType="submit"
            >
              Submit Record
            </Button>
          </Form.Item>
        </Form>
        <Modal open={open} title="Reset Password Using Email"
          onOk={handleOk}
          onCancel={handleCancel}>
        <NotificationConfirmation/>
      </Modal>
      </div>:<h1>Coming soon....</h1>}
     
      </div>
  );
};
