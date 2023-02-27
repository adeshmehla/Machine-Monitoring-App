import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input,Modal,Select,Space, TimePicker } from "antd";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import dayjs from 'dayjs';
import {useSelector} from 'react-redux';
import { NotificationConfirmation } from "../notificationConfirmation";
export const MechanicForm = () => {
  const [open, setIsOpen] = useState(false);
  // const option = {Select}
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [startTime,setStartTime] =useState(null);
  const[machine_repaired,setMachineRepaired]=useState(false)
  const data = useSelector(state=>state.pageReducer.data);
  const [selectedTime,setSelectedTime]=useState(dayjs(moment().format('hh:mm:ss')))
  const date = new Date();
  useEffect(()=>{
    setSelectedTime(moment().format('hh:mm:ss'))
  },[date])
  
  const time =new Date()
  var hour = time.getHours();
  var minute = time.getMinutes();
  var second = time.getSeconds();
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
    console.log(data,'inn home component++++++');
    console.log(data,'data in machanic page')
    dayjs(moment().format('hh:mm:ss'), 'HH:mm:ss')
    
    setStartTime(`${hour}/${minute}/${second}`)
    console.log(startTime,'+++++++');
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


const isChecked = (e)=>{
  setMachineRepaired(e.target.checked)
}

  const onFinish = (values) => {
   if(machine_repaired){
console.log(values,"+++++++++++++++ machine repaired")
   }else{
    alert('Please repair the machine and click on the machine is repaired checkbox for confirmation')
   }
    // let oldData = JSON.parse(localStorage.getItem("userData"));
    // localStorage.setItem("userData", JSON.stringify([...oldData, values.user]));
    // console.log(values, "-----------");
    if (values) {
      setIsOpen(true);
      navigate("/notification_confirmation")
    }
  };
  return (
    <div className={styles.section}>
       {data ? <div className={styles.container}>
    <h2 style={{textAlign:"center"}}>Mechanic</h2>
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
            label="Line Number"
            name="line_no"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="machine_no"
            label="Machine Number"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="machine_type"
            label="Machine Type"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input  
            />
          </Form.Item>
          <Form.Item
            name={ "start_time"}
            label="Start Time"
            rules={[
              {
                required: true
              }
            ]}
          >
            <Input defaultValue = {`${hour}/${minute}/${second}`} type="time" />
          </Form.Item>
                <Form.Item
                  name={ "operation"}
                  label="Operation"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input 
                  />
                </Form.Item>
                {/* <Form.Item
            name={ "breakdown_time"}
            label="Repair Time"
            rules={[
              {
                required: true
              }
            ]}
          >
            <TimePicker defaultValue={dayjs(moment().format('hh:mm:ss'), 'HH:mm:ss')} size="large" />
          </Form.Item> */}
          <Form.Item
                  name={"breakdown_reason"}
                  label="Breakdown Reason"
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
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="skip_stitch" label="Skip stitch">
     
      <Space>
      Skip stitch	npm
      </Space>
    </Option>
    <Option value="thread_breakage" label="Thread breakage">
      <Space>
      Thread breakage
      </Space>
    </Option>
    <Option value="stitching_problem" label="Stitching problem">
      <Space>
      Stitching problem
      </Space>
    </Option>
    <Option value="jamming_of_machine" label="Jamming of machine">
      <Space>
      Jamming of machine
      </Space>
    </Option>
    <Option value="needle_breakage" label="Needle breakage">
      <Space>
      Needle breakage	
      </Space>
    </Option>
    <Option value="hook_set_problem" label="Hook set problem">
      <Space>
      Hook set problem
      </Space>
    </Option>
    <Option value="spare_part_breakage" label="Spare part breakage">
      <Space>
      Spare part breakage
      </Space>
    </Option>
    <Option value="computer_problem" label="Computer Problem">
      <Space>
      Computer Problem
      </Space>
    </Option>
    <Option value="oil_leakage" label="Oil leakage">
      <Space>
      Oil leakage
      </Space>
    </Option>
    <Option value="roping_problem" label="Roping problem">
      <Space>
      Roping Problem
      </Space>
    </Option>
    <Option value="binder_problem" label="Binder problem">
      <Space>
      Binder Problem
      </Space>
    </Option>
    <Option value="folder_problem" label="Folder Problem">
      <Space>
     Folder Problem
      </Space>
    </Option>
    <Option value="knife_change" label="Knife change">
      <Space>
      Knife Change
      </Space>
    </Option>
    <Option value="motor_problem" label="Motor Problem">
      <Space>
     Motor Problem
      </Space>
    </Option>
  </Select>
                </Form.Item>
          <Form.Item
                  name={ "action_taken"}
                  label="Action Taken"
                  rules={[
                    {
                      required: true
                    }
                  ]}
                >
                  <Input />
                </Form.Item>
          <Form.Item
                  name={"part_replaced"}
                  label="Part Replaced"
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
    placeholder="select Parts"
    // defaultValue={['wire']}
    onChange={handleChange}
    optionLabelProp="label"
  >
    <Option value="hand_wheel_siruba_O/L" label="Hand wheel siruba O/L">
      <Space>
      Hand wheel siruba O/L	
      </Space>
    </Option>
    <Option value="GKC83_Front_cover_siruba O/L	"
     label="GKC83 Front cover siruba O/L">
      <Space>
      GKC83 Front cover siruba O/L	
      </Space>
    </Option>
    <Option value="KB15B_door_lock_siruba_O/L"
     label="KB15B door lock siruba O/L">
      <Space>
      KB15B door lock siruba O/L
      </Space>
    </Option>
    <Option value="KQ05_Fixing_guard_feed_dog_siruba_O/L" 
    label="KQ05 Fixing guard feed dog siruba O/L">
      <Space>
      KL201 connecting holder siruba O/L	
      </Space>
    </Option>
    <Option value="9008_oil_filter_O/L" label="9008 oil filter O/L">
      <Space>
      9008 oil filter O/L	
      </Space>
    </Option>
    <Option value="KN18A_THD_takeup_lever_siruba_O/L" label="KN18A THD takeup lever siruba O/L">
      <Space>
      KN18A THD takeup lever siruba O/L	
      </Space>
    </Option>
    <Option value="KJ01B_connector_siruba_O/L" label="KJ01B connector siruba O/L">
      <Space>
      KJ01B connector siruba O/L	
      </Space>
    </Option>
    <Option value="KR19_upper_blade_Asm_siruba_O/L" label="KR19 upper blade Asm siruba O/L">
      <Space>
      KR19 upper blade Asm siruba O/L		
      </Space>
    </Option>
    <Option value="KS01_Presser_foot_arm_siruba_O/L"
     label="KS01 Presser foot arm siruba O/L	">
      <Space>
      KS01 Presser foot arm siruba O/L	
      </Space>
    </Option>
    <Option value="KJ26_Upper_looper_holder_siruba_O/L" 
label="KJ26_Upper_looper_holder_siruba_O/L">
      <Space>
      KJ26 Upper looper holder siruba O/L	
      </Space>
    </Option>
    <Option value="KG236_Needle_holder_siruba_O/L	"
     label="KG236 Needle holder siruba O/L	">
      <Space>
      KG236 Needle holder siruba O/L	
      </Space>
    </Option>
    <Option value="H208_Front_feed_dog_siruba_O/L	"
     label="H208 Front feed dog siruba O/L">
      <Space>
      H208 Front feed dog siruba O/L	
      </Space>
    </Option>
    <Option value="KN20, 5th Cam lever siruba O/L	"
     label="KN20, 5th Cam lever siruba O/L">
      <Space>
      KN20, 5th Cam lever siruba O/L	
      </Space>
    </Option>
    <Option value="KF96 Needle bar siruba"
     label="KF96 Needle bar siruba">
      <Space>
      KF96 Needle bar siruba	
      </Space>
    </Option>
  </Select>
                </Form.Item>
          <Form.Item
                  name={["user", "no_of_spare_parts"]}
                  label="No Of Spare Parts"
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
              ...layout.wrapperCol,
              offset: 3
            }}
          >
            <Checkbox onChange={isChecked}>Form Submitted?</Checkbox>
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
