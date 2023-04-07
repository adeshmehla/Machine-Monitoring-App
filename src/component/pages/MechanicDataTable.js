import { useState,useEffect } from 'react';
import { Table,Space,Button } from 'antd';
import axios from 'axios';
import { Scanner } from './qr/scanner';
import { isAuth } from "../redux/pageSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// const data = [
//   {
//     key: '1',
//     line_number: 43,
//     machine_number: 98,
//     machine_type: 60,
//     operation: "problem Solve",
//     breakdown_reason: 'Software Error',
//     action_taken: "Fix It",
//     part_replaced: "9008 oil filter O/L",
//     no_of_spare_parts: 7,
//   },
//   {
//     key: '2',
//     name: 'Jim Green',
//     chinese: 98,
//     math: 66,
//     english: 89,
//   },
//   {
//     key: '3',
//     name: 'Joe Black',
//     chinese: 98,
//     math: 90,
//     english: 70,
//   },
//   {
//     key: '4',
//     name: 'Jim Red',
//     chinese: 88,
//     math: 99,
//     english: 89,
//   },
// ];
const onChange = (pagination, filters, sorter, extra) => {
};
export const MechanicDataTable  = () =>{
  const[data,setData]=useState(null)
  const [scanStart, setScanStart] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'Line Number',
      dataIndex: 'line_number',
    },
    {
      title: 'Machine Number',
      dataIndex: 'machine_number',
      sorter: {
        compare: (a, b) => a.machine_number - b.machine_number,
        // multiple: 3,
      },
    },
    {
      title: 'Mechanic Name',
      dataIndex: 'mechanic_name',
      sorter: {
        compare: (a, b) => a.mechanic_name - b.mechanic_name,
        multiple: 2,
      },
    },
    {
      title: 'Breakdown Time',
      dataIndex: 'breakdown_time',
    //   render: (text, record, index) => {
    //     return fromCurrentIndex(index);
    // },
      sorter: {
        compare: (a, b) => a.breakdown_time - b.breakdown_time,
        multiple: 2,
      },
    },
    {
      title: 'Action Taken',
      dataIndex: 'action_taken',
      render:(_, record) => (
        <Space size="middle">
          <Button onClick={()=>setScanStart(true)}>Scan</Button>
        </Space>
      )
    },
    
  ];
 
 
 
 
 
  const loadData = async()=>{
    axios.get('http://localhost:5000/api/supervisor_table').then(res=>setData(res.data)).then(err=>console.log(err,'error'))
 
  }
  useEffect(()=>{
    loadData();
  },[])
  const handleLogout = ()=>{
    dispatch(isAuth(false))
     navigate('/')
     localStorage.clear()
   }
  return(
  <>
  <Button style={{backgroundColor:"rgb(49, 216, 77)",margin:"2%"}} onClick={handleLogout}>Logout</Button>
<Table style={{margin:"auto",width:"80%"}} columns={columns} dataSource={data} onChange={onChange} />;
{scanStart && <Scanner />}
</> 
)}
