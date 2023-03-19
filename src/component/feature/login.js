import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Button, Form, Space,Input, Tooltip,Typography, Modal } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import login_img from '../img/images.jpg'
import styles from "./feature.module.css";
import { ForgotPassword } from "./forgot_password";
import {degination} from '../redux/pageSlice'
import {useDispatch} from 'react-redux';
export const Login = () => {
  const [data,setData]=useState(null);
  const [employeeName,setEmployeeName]=useState('')
  const loadData = async()=>{
    axios.get('http://localhost:5000/api/login').then(res=>setData(res.data)).then(err=>console.log(err,'error'))
  }
  useEffect(()=>{
    loadData();
  },[])
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate('');
  const [employee_name, setEmployee_name] = useState("");

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


  const onFinish = (values) => {
    console.log(values, "login Data++++++++++++");
    if(values){
     let loginAuth =  data.filter((i)=>i.card_number===values.user.card_number && i.password===values.user.password)
      console.log(loginAuth,'----------------')
     if(loginAuth.length){
       navigate('/qrcode')
     }else{
      alert('Login failed wrong user credentials')
     }
    }
  };
  const handleGetEmployeeName=(e)=>{
console.log(e.target.value,'--------------')
 let b =  data.filter((i)=>i.card_number===e.target.value);
 setEmployeeName(b[0].employee_name)
console.log(b[0].employee_name,'---------------------+++++++++++++-',employeeName) 
}
// const card_details=[
//   {card_number:"3546556",employee_name:"ramesh"},
//   {card_number:"9898",employee_name:"mohan"},
//   {card_number:"5678768",employee_name:"vikash"},
// ]

// const handleCardNumberChange=(e)=>{
// console.log(e.target.value,'cardname')
// const d = card_details.find(i=>i.card_number==e.target.value)
// console.log(d,'onmatch')
// if(d){
//   console.log('in if condition')
//   setEmployeeName(d.employee_name);
// }
// }

  return (
    <>
        <div className={styles.main_container}>
      <div className={styles.container}>

        
        <h2>Login </h2>
        <Form
          form={form}
          className={styles.form_container}
          layout="vertical"
          initialValues={{ employee_name:'default value' }}
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
              <Radio.Button value="Machanic">Mechanic</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
          {/* <Space> */}
          <Form.Item name={["user", "card_number"]} label="Card Number">
            <Input type="number" onBlur={handleGetEmployeeName}/>
          </Form.Item>
          <Tooltip title="Employee Name">
          <Typography>{employeeName}</Typography>
        </Tooltip>
      {/* </Space> */}
          {/* <Form.Item name={["user", "employee_name"]} label="Employee Name">
            <Input />
          </Form.Item> */}
          <Form.Item
            name={["user", "password"]}
            label="Your Password"
           
            rules={[
              {
                required: true
              }
            ]}
            >
            <Input  type="password" />
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
        {/* <p className={styles.feature_footer_link}>
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
        </p> */}

        <Modal
          width={320}
          // visible={isModalOpen}
          title="Reset Password Using Email"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          >
          <ForgotPassword />
        </Modal>
        </div>
            </div>
    </>
  );
};
