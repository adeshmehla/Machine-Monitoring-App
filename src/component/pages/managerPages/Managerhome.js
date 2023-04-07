// CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
import { Button,Card,Layout } from 'antd'
import style from './managerHome.module.css'
import React from 'react'
import { MechanicTableForManager } from './inventory/mechanicTableForManager'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isAuth } from '../../redux/pageSlice'
import axios from 'axios'
import { useState,useEffect,useMemo } from 'react'
import {ManagerSideBar} from "./managerSiderbar";
import { Chart } from 'react-charts'
import {Navbar} from './navbar'
import {TopicMenu} from "./inventory/topicMenu";
import { ViewInventory } from './inventory/viewInventory'
import { MechanicDataTable } from '../MechanicDataTable'
import { MyChart } from './analysis'
import { PartIssue } from './inventory/partIssue'
export const ManagerHomePage=()=>{
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const[data,setData]=useState(null)
  const[supervisorData,setsupervisorData]=useState(null)
  const[totalDownTime,setTotalDownTime]=useState(0);
  const topics = [<MechanicTableForManager data={data}/>, <PartIssue/>,<ViewInventory/>,<MyChart downtimeData={totalDownTime}/>];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  // const[supervisorData,setSupervisorData]=useState(null)
  // const[breakdownEndTime,setBreakdownEndTime]=useState(null)
  const handleLogout = ()=>{
   dispatch(isAuth(false))
    navigate('/')
    localStorage.clear()
  }

 
  useEffect(()=>{
    axios.get('http://localhost:5000/api/mechanic_table')
    .then(res=>setData(res.data))
    axios.get('http://localhost:5000/api/supervisor_table')
    .then(res=>setsupervisorData(res.data))
  
  },[])

  const getBreakDownTime = ()=>{
    const arr=[];
    let TotalTimeSum=0;
    for(let i=0;i<data.length;i++){
      const startTime = new Date(supervisorData[i].breakdown_start_time); 
      const endTime = new Date(data[i].breakdown_end_time);
      console.log(startTime,endTime,'booth times')
      const diffTime = Math.abs(endTime - startTime);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      // console.log(diffTime + " milliseconds");
      // console.log(diffDays + " days"); 
      var ms = diffTime,
      min = Math.floor((ms/1000/60) << 0),
      sec = Math.floor((ms/1000) % 60);
      TotalTimeSum+=min
      // console.log(min/60 + ':' + sec);
      arr.push(min/60 +":"+ sec)
      data[i].breakdown_time = arr[i]
    }
    setTotalDownTime(TotalTimeSum);
    // data.breakdown_time = arr
    // console.log(arr,'hello arr')
    if(arr){
      
      // data[1].breakdown_time = arr[1]
      // data.breakdown_time = arr[0]
      // setData({ ...data });
      console.log(data,'l')
    }
      //  let supervisorIds =  supervisorData.filter(i=>console.log(i.id))
      //   const results1 = supervisorData.filter(({ id: id1 }) => data.some(({ id: id2 }) => id2 === id1));
      //   const results2 = data.filter(({ id: id1 }) => supervisorData.some(({ id: id2 }) => id2 === id1));
      
      // // console.log(results1,results2,'-----same Id ------------')
      // let start = results1[1].breakdown_start_time.slice(10,16)
      
      // let end = results2[1].breakdown_end_time.slice(10,16)
      
      // console.log(start.slice(1,2),end.slice(1,3),'------------',start,end)
      // console.log(,'------------')
// let newArr = results1[0].breakdown_start_time


}
const changeSelectedKey = (event) => {
  const key = event.key;
  setSelectedKey(key);
  setContentIndex(+key);
};
  const Menu = (
    <TopicMenu
      topics={topics}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );
  return (
    <>
    <div className={style.mainHeading}>
    <h2 >Manager & Executive (Seniors)</h2>
    </div>
    <Button onClick={getBreakDownTime}>Calculate BreakdownTime</Button>
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="Downtime Status" bordered={false} style={{ width: 300 }}>
      <p>Downtime duration: <span>{(totalDownTime/60).toFixed(2)}  hours</span> </p>
    </Card>
  </div>,
        <Button style={{margin:"2%",float:"right"}} type='primary' onClick={handleLogout}>Logout</Button>
      

  {/* <ViewInventory />
  <MechanicTableForManager data={data}/> */}

<Navbar menu={Menu}/>
      <Layout>
        <ManagerSideBar menu={Menu} />
        <Layout.Content className="content">
          {topics[contentIndex]}
        </Layout.Content>
      </Layout>
   {/* <Chart datas={data1} axes={axes} /> */}
    </>
  )
}



















// on Finish

// if (values) {
//   let machedRow =  supervisorData.filter(i=>i.machine_number === values.machine_number)
//   // if(machedRow){
//     console.log(machedRow,'machedRowwwwwwwwwwwwww',supervisorData)
//     let startTime;
//   // }
//     if(values.breakdown_end_time==undefined){
//       values.breakdown_end_time =new Date(values.breakdown_end_time.moment().format('YYYY-MM-DD hh:mm:ss'))
//       startTime = new Date(machedRow[0].breakdown_start_time)
//     }
//     console.log(values,'onSubmit')
//     const {line_number,machine_number,machine_type,operation,breakdown_reason,action_taken,part_replaced,number_of_spare_parts,breakdown_end_time} = values;
//     setIsOpen(true);
//     axios
//     .post('http://localhost:5000/api/mechanic', {
//       line_number,machine_number,machine_type,operation,breakdown_reason,action_taken,part_replaced,number_of_spare_parts,breakdown_end_time,startTime,
//     })
//     .then((response) => {
//       setPost(response.data);
//     }).catch((err)=>alert(err,'error'));
  
//   }