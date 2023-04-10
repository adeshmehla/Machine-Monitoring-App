import React,{useEffect, useState} from 'react'
import { Button, Form, Select,Input } from 'antd';
import axios from 'axios';
import { PartScanner } from './partScanner';
// import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
export const PartIssue = () => {
  const[updateRow,setUpdateRow]=useState(null);
  const[showUpdateButton,setShowUpdateButton]=useState(true);
  const[description,setDescription]=useState(null);
  const[showForm,setShowForm]=useState(false);
   const[apiData,setApiData]=useState([]);
  //  const navigate = useNavigate()
   const [form] = Form.useForm();
   const onMechanicChange = (value) => {
    console.log(value)
  };
  useEffect(()=>{
    axios.get('http://localhost:5000/api/parts_table').then(res=>setApiData(res.data))
    
    // console.log(data,'data data data')
    // console.log(postData,'kkkkkkkkkkkkkkkkkkkkkk')
  },[])
  const onFinish = async(values) => {
    console.log(values,'onFinish')
    // const updateRow = apiData.filter(i=>i.item_code==values.item_code)
    console.log(updateRow,'updateRow')
    values.last_received_date = moment().format('YYYY-MM-DD hh:mm:ss')
    values.cost = 3000
    values.category = "power"
    values.part_name = "oilgear"
    let datas ={
      // id:updateRow[0].id,    
      stock_balance:values.stock_balance,          
      for_machine:values.for_machine,          
      part_code:values.part_code,          
      part_description:values.part_description,      
      last_received_date:values.last_received_date,      
      cost:values.cost,      
      category:values.category,      
      part_name:values.part_name,      
    }
    try {
      const [firstResponse, secondResponse] = await Promise.all([
        axios.post('http://localhost:5000/api/issueParts', datas),
        axios.put(`http://localhost:5000/api/updatePartsDb`,{
          id: updateRow[0].id,
          part_quantity: updateRow[0].part_quantity-values.stock_balance,        
        })
      ]);
    } catch (error) {
      console.log(error)
    }
    setShowUpdateButton(preState=>!preState)
  };
    const onReset = () => {
      form.resetFields();
    };
    const onFill = () => {
      form.setFieldsValue({
        note: 'Hello world!',
        gender: 'male',
      });
    };


const handleIssuePart =()=>{
  setShowUpdateButton(preState=>!preState) 
}
const handleItemCodeChange=(e)=>{
  
  // console.log(apiData.filter(i=>i.part_code),'hello')
  console.log(apiData.filter(i=>i.part_code==e.target.value),'hello')
  setUpdateRow(apiData.filter(i=>i.part_code==e.target.value))
}
const handleScaned = (b)=>{
  console.log(b,'scanner data')
  if(b){
    setDescription(b.machine_type)
  }
  setShowForm(preState=>!preState);
}
  return (
   <>
   <div style={{margin:"auto",width:"50%",marginTop:"3%"}}>
     <h2 style={{textAlign:"center"}}>Update Parts</h2>
    {showUpdateButton &&<div style={{border:"1px solid red", marginBottom:"5%",width:"400px",height:"300px"}}>
    <Button onClick={handleIssuePart} style={{width:"50%",height:"50px",position:"relative",top:"132px",left:"106px"}}>Add Part</Button>
    </div>}
    {/* //////////////////////////////////////////////// */}
 {!showUpdateButton && !showForm && 
 <PartScanner handleScaned={handleScaned}/>}
 {showForm && 
   <Form
{...layout}
form={form}
name="control-hooks"
onFinish={onFinish}
style={{ maxWidth: 600 }}
>

<Form.Item name="part_code" onChange={handleItemCodeChange} label="Item Code" rules={[{ required: true }]}>
  <Input/>
</Form.Item>
<Form.Item name="part_description" initialValue={description && description} label="Item Description" rules={[{ required: true }]}>
  <Input/>
</Form.Item>
<Form.Item name="stock_balance" label="Quantity" rules={[{ required: true }]}>
  <Input type='number'/>
</Form.Item>
<Form.Item name="mechanic_name" label="mechanic_name" rules={[{ required: true }]}>
  <Select
    onChange={onMechanicChange}
    allowClear
    >
    {apiData.map(i=><Option value={i.id}>{i.mechanic_name}</Option> )}
  </Select>
</Form.Item>
<Form.Item name="for_machine" label="Machine Number" rules={[{ required: true }]}>
<Input/>
</Form.Item>
<Form.Item {...tailLayout}>
  <Button   type="primary" htmlType="submit">
    Update
  </Button>
</Form.Item>
</Form>
}
    </div>
   </>
  )
}
