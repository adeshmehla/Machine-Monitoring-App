import React from 'react'
import { Table,Form,Input,Select,Button } from 'antd'
export const ViewInventory = () => {
 const columns = [
    {
    title:"Category",
    dataIndex:"category"
    },
    {
    title:"For Machine",
    dataIndex:"for_machine"
    },
    {
    title:"Part Change",
    dataIndex:"part_change"
    },
    {
    title:"Part Name",
    dataIndex:"part_name"
    },
    {
    title:"Description",
    dataIndex:"description"
    },
    {
      title:"Cost",
    dataIndex:"cost"
    },
    {
      title:"Last Received Date",
    dataIndex:"last_received_data"
    },
    {
      title:"Stock Balance",
    dataIndex:"stock_balance"
    },
 ]
 const data = [{category:3,for_machine:2,part_name:"cutter"}]
  
 const onFinish = ()=>{
   console.log('onSearch')
 }

 return (
    <div style={{margin:"auto",width:"90% "}}>
     <h2 style={{textAlign:"center"}}>Store Executive / View Inventorty</h2>
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
            <Select.Option  value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
            <Select.Option value="demo">Demo3</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="for_machine"
          label="For Machine"
        >
       <Select style={{width:"120px"}}>
            <Select.Option value="demo">Demo</Select.Option>
            <Select.Option value="demo">Demo2</Select.Option>
            <Select.Option value="demo">Demo3</Select.Option>
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
