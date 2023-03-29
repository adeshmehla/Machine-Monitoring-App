import React, { useState, useEffect } from "react";
import axios from 'axios'
import { Button, Form, Space,Input, Tooltip,Typography, Modal } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";
import login_img from '../img/images.jpg'
import styles from "./feature.module.css";
import { ForgotPassword } from "./forgot_password";
import {degination,isAuth} from '../redux/pageSlice'
import {useDispatch} from 'react-redux';
export const Login = () => {
  const [data,setData]=useState(null);
  const [employeeName,setEmployeeName]=useState('')
  const loadData = async()=>{
    axios.get('http://localhost:5000/api/login').then(res=>setData(res.data)).then(err=>console.log(err,'error'))
  }
  useEffect(()=>{
    loadData();
    localStorage.clear()
  },[])
  const [form] = Form.useForm();
  const[state,setState]=useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate('');
 
  const onFinish = (values) => {
    // setTimeNow(time.getTime());
    // console.log(values, "login Data++++++++++++",);
    if(values){
      setState(pre=>pre+1)
      let loginAuth =  data.filter((i)=>i.card_number===values.user.card_number && i.password===values.user.password)
      // console.log(loginAuth,'----------------')
      if(loginAuth.length){
        // console.log(loginAuth[0].card_number,'[[[[[')
        if(loginAuth[0].card_number==753353){
          navigate('/manager')
          window.location.reload();
        localStorage.setItem('isManager','manager')
        dispatch(isAuth())
      }else if(loginAuth[0].card_number==247718 ||235817 || 242533 || 731032 || 60010393 || 237811 || 245035 || 734587 || 237961 || 235793 || 235801 || 750262 || 60053426 || 753228 || 237503 || 234814 || 236588 || 570589 || 60531977 || 225011 || 237959 || 220101 || 751090){
        // setState(pre=>pre+2)
        navigate('/mechanicdatatable')
        localStorage.setItem('isMechanic','mechanic')
        dispatch(isAuth())
        window.location.reload();
      }else{
        // setState(pre=>pre+2)
        navigate('/qrcode')
        localStorage.setItem('isSupervisor','supervisor')
        dispatch(isAuth())
        window.location.reload();
      }
     }else{
      alert('Login failed wrong user credentials')
     }
    }
  };
  const handleGetEmployeeName=(e)=>{
// console.log(e.target.value,'--------------')
 let b =  data.filter((i)=>i.card_number===e.target.value);
 if(b){
   setEmployeeName(b[0].employee_name)
  //  console.log(b[0].employee_name,'---------------------+++++++++++++-',employeeName) 
  }
}

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
         
          <Form.Item name={["user", "card_number"]} label="Card Number">
            <Input type="number" onBlur={handleGetEmployeeName}/>
          </Form.Item>
          <Tooltip title="Employee Name">
          <Typography>{employeeName}</Typography>
        </Tooltip>
   
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
        </div>
            </div>
    </>
  );
};
