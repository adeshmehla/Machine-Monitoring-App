import React, { useEffect, useState } from "react";
import { Button, Form, Input,Modal,Select,Space, TimePicker } from "antd";
import {useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import dayjs from 'dayjs';
import { NotificationConfirmation } from "./notificationConfirmation";
export const SupervisorForm = () => {
  const [open, setIsOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedTime,setSelectedTime]=useState(dayjs(moment().format('hh:mm:ss')));
  const data = useSelector(state=>state.pageReducer.data);
  const date = new Date();
  useEffect(()=>{
    setSelectedTime(moment().format('hh:mm:ss'))
    console.log(moment().format('hh:mm:ss'));
  },[date])
  

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
  useEffect(()=>{
    console.log(data,'inn superviser component++++++')
  },[])

  const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

  const handleOk = () => {
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const onFinish = (values) => {
    // setDataBase(values);
    // values.preventDefaul;
    // localStorage.setItem('items', JSON.stringify([ ...oldData, ...obj ]));
  

    let oldData = JSON.parse(localStorage.getItem("userData"));
    localStorage.setItem("userData", JSON.stringify([...oldData, values.user]));
    console.log(values, "-----------");
    if (values) {
      setIsOpen(true);
      // navigate("/notification_confirmation")
    }
  };
  const line1 ={name:"aaa"}
  const line2 ={name:"aaa"}

  const handlemechanicChange = (e)=>{
console.log(e.target.value)
  }
  return (
    <div className={styles.section}>
       {data ? <div className={styles.container}>
       <h2 style={{textAlign:"center"}}>Supervisor</h2>
        {/* <Button className={styles.home_btn} type="primary">
          First
        </Button>
        <Button className={styles.home_btn} type="primary">
          Second
        </Button> */}
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
            name="line_no"
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
          defaultValue="props.data.machine_no"
            name="machine_no"
            // defaultValue={ props.data.machine_id}
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
            name="mechanic "
            // defaultValue={ props.data.machine_id}
            label="mechanic"
            
            rules={[
              {
                required: true
              }
            ]}
          >
             <Select
    mode="multiple"
    style={{
      width: '100%',
    }}
    placeholder="select one country"
    // defaultValue={['Overrunning machines']}
    onChange={handlemechanicChange}
    optionLabelProp="label"
  >
    
  </Select>
          </Form.Item>
                <Form.Item
            name="breakdown_time"
            label="Breakdown Time"
            rules={[
              {
                required: true
              }
            ]}
          >
            <TimePicker defaultValue={dayjs(moment().format('hh:mm:ss'), 'HH:mm:ss')} size="large" />
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
