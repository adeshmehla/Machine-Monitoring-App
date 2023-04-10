import React, { useEffect, useState } from 'react'
import { Table,Form,Input,Select,Button } from 'antd'
import axios from 'axios';
export const ViewInventory = () => {
  const[data,setData]=useState([]);
  const[filteredData, setFilteredData]=useState([]);
  const[receivedDates,setReceivedDates]=useState(null);
  
  useEffect(()=>{
    axios
    .get("http://localhost:5000/api/parts_issue")
    .then((res) => setData(res.data), setReceivedDates(data));
  },[])
 const columns = [
    {
      key:1,
    title:"Category",
    dataIndex:"category"
    },
    {
      key:2,
    title:"For Machine",
    dataIndex:"for_machine"
    },
    {
      key:3,
    title:"Part Code",
    dataIndex:"part_code"
    },
    {
      key:4,
    title:"Part Name",
    dataIndex:"part_name"
    },
    {
      key:5,
    title:"Description",
    dataIndex:"part_description"
    },
    {
      key:6,
      title:"Cost",
    dataIndex:"cost"
    },
    {
      key:7,
      title:"Last Received Date",
    dataIndex:"last_received_date",
    render:(i)=>{
      return i.slice(0,10);
    }
    },
    {
      key:8,
      title:"Stock Balance",
    dataIndex:"stock_balance"
    },
 ]

 
 const getBreakDownTime = () => {
  console.log(data,'pppp')
  const arr = [];
 console.log('hello')
  for (let i = 0; i < data.length; i++) {
    const startTime = new Date(data[i].last_received_date);
  arr.push(`${startTime.getDate()}:${startTime.getMonth()}:${startTime.getFullYear()}`,'oo')
  // data.last_received_date = receivedDates
  data[i].last_received_date = arr[i];
  console.log(data,'lllllll')
}
};


 const onFinish = (e)=>{
    // if(e.category){
      const newData = data.filter(x=>x.category == (e.category == '' ? x.category:e.category))
      .filter(y=>y.for_machine == (e.for_machine))
      setFilteredData(newData)
      // const newData = data.filter(i=>i.category==e.category).filter(i=>i.for_machine==e.for_machine).filter(i=>i.part_code==e.part_code);
    // setData(newData);
        console.log(newData,'in category confition',newData,e)
    // }else if(e.for_machine){
    //   setFilteredData(data.filter(i=>i.for_machine==e.for_machine));
    // }else if(e.part_code){
    //   setFilteredData(data.filter(i=>i.part_code==e.part_code));
    // }else{
    //  let b =  data.filter(i=>i.category==e.category);
    //  setData(b.filter(i=>i.for_machine==e.for_machine))
    // }

 }

 return (
    <div style={{margin:"auto",width:"90% "}}>
     <h2 style={{textAlign:"center"}}>Store Executive / View Inventorty</h2>
     <Button onClick={getBreakDownTime}>Get TIme</Button>
      <Form
      //   className="tool_record_form"
        name="tool-form"
        layout="inline"
        onFinish={onFinish}
        style={{
          maxWidth: 1200,
        }}
        // initialValues={{
        //   price: {
        //     number: 0,
        //     currency: 'rmb',
        //   },
        // }}
      >
      
        <Form.Item
          name="category"
          label="Category"
        >
       <Select style={{width:"120px"}}>
          {data && data.map(i=>  <Select.Option value={i.category}>{i.category}</Select.Option>)}
          {/* <Select.Option value="1">"one"</Select.Option> */}
          </Select>
        </Form.Item> 
         <Form.Item
          name="for_machine"
          label="For Machine"
        >
       <Select style={{width:"120px"}}>
       {data && data.map(i=>  <Select.Option value={i.for_machine}>{i.for_machine}</Select.Option>)}
        {/* <Select.Option value="1">"one"</Select.Option> */}
         
          </Select>
        </Form.Item>
        <Form.Item
          name="part_code"
          label="Part Code"
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button className="search_btn" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Button>Export Report</Button>
        <Table
        columns={columns}
        dataSource={data}
        />
    </div>
  )
}
