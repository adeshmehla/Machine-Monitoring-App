import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form,  Input, Tooltip, Typography } from "antd";
import {useNavigate } from "react-router-dom";
import styles from "./feature.module.css";
import { degination, isAuth } from "../redux/pageSlice";
import { useDispatch } from "react-redux";
export const Login = () => {
  const [data, setData] = useState(null);
  const [employeeName, setEmployeeName] = useState("");
  const [employeeType, setEmployeeType] = useState([]);
  const loadData = async () => {
    axios
      .get("http://localhost:5000/api/login")
      .then((res) => setData(res.data))
      .then((err) => console.log(err, "error"));
  };
  useEffect(() => {
    loadData();
    
    localStorage.clear();
  }, []);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate("");

  const onFinish = (values) => {
    // setTimeNow(time.getTime());
    console.log(employeeType,'oooooooooooooooooooo')
    console.log(values,'values')
    if (values) {
     const loginAuth = data.filter(i=>i.password === values.password)
    if(loginAuth.length){
      if (employeeType === "manager" ) {
        navigate("/ManagerHomePage");
        console.log("in if condition and why");
        window.location.reload();
        localStorage.setItem("isManager", "manager");
        dispatch(isAuth());
      } else if (employeeType === "mechanic") {
        console.log("in else if 2 condition and why");
        // setState(pre=>pre+2)
        navigate("/mechanicdatatable");
        localStorage.setItem("isMechanic", "mechanic");
        dispatch(isAuth());
        window.location.reload();
      } else if (employeeType === "supervisor") {
        // setState(pre=>pre+2)
        console.log("in else if 3 condition and why");
        navigate("/supervisorScanner");
        localStorage.setItem("isSupervisor", "supervisor");
        dispatch(isAuth());
        window.location.reload();
      }else {
        alert("Login failed wrong user credentials");
      }
    }else{
      alert("Wrong Password")
    }
    }else{
      alert("please add card Number or password")
    }
  };
  const handleGetEmployeeName = (e) => {
    // console.log(e.target.value,'--------------')
    let b = data.filter((i) => i.card_number === e.target.value);
    if (!b.length) {
      alert("Wrong Card Number");
    } else {
      setEmployeeName(b[0].employee_name);
     setEmployeeType(b[0].credential_type)
    }
  };

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <h2>Login </h2>
          <Form
            form={form}
            className={styles.form_container}
            layout="vertical"
            initialValues={{ employee_name: "default value" }}
            name="nest-messages"
            onFinish={onFinish}
            style={{
              maxWidth: 600,
            }}
            // validateMessages={validateMessages}
          >
            <Form.Item name="card_number" label="Card Number">
              <Input type="number" onBlur={handleGetEmployeeName} />
            </Form.Item>
            <Tooltip title="Employee Name">
              <Typography>{employeeName}</Typography>
            </Tooltip>

            <Form.Item
              name="password"
              label="Your Password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 1,
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
