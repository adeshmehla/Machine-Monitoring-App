import React, {useState,useEffect } from "react";
import { Button, Checkbox, Form, Input,Modal,Select,Space, TimePicker } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import {useSelector} from 'react-redux';
export const MechanicForm = () => {
  const [open, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [post,setPost]=useState(null);
  const[isMachineRepaird,setMachineRepaired]=useState(false)
  const data = useSelector(state=>state.pageReducer.data);
  const[supervisorData,setsupervisorData]=useState(null)


useEffect(()=>{
  axios.get('http://localhost:5000/api/supervisor_table')
    .then(res=>setsupervisorData(res.data))
    // new Date(supervisorData[1].breakdown_start_time); 
},[])

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
 

  const { Option } = Select;
const handleChange = (value) => {
  // console.log(`selected ${value}`);
};

  const handleOk = () => {
    setIsOpen(false);
    navigate('/mechanicdatatable')
  };

  const handleCancel = () => {
    setIsOpen(false);
  };


const isChecked = (e)=>{
  setMachineRepaired(e.target.checked)
}

  const onFinish = (values) => {
  
    if (values) {
    
      if(values.breakdown_end_time==undefined){
        values.breakdown_end_time = moment().format('YYYY-MM-DD hh:mm:ss')
      }
      console.log(values,'onSubmit')
      const {line_number,machine_number,machine_type,operation,breakdown_reason,action_taken,part_replaced,number_of_spare_parts,breakdown_end_time} = values;
      setIsOpen(true);
      axios
      .post('http://localhost:5000/api/mechanic', {
        line_number,machine_number,machine_type,operation,breakdown_reason,action_taken,part_replaced,number_of_spare_parts,breakdown_end_time,
      })
      .then((response) => {
        setPost(response.data);
      }).catch((err)=>alert(err,'error'));
    
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
            name="line_number"
            // initialValue={supervisorData.line_number}
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
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
                  name={"number_of_spare_parts"}
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
                style={{display:"none"}}
            name="breakdown_end_time"
            label="Repair Start Time"
           
          >
         <TimePicker size="large" disabled/>
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
        <Modal open={open} title="Send Notification Successfully"
          onOk={handleOk}
          onCancel={handleCancel}>
        {/* <NotificationConfirmation/> */}
      </Modal>
      </div>:<h1>Coming soon....</h1>}
     
    </div>
  );
};
