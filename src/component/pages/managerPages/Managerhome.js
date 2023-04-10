// CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
import { Button, Card, Layout } from "antd";
import style from "./managerHome.module.css";
import React from "react";
import { MechanicTableForManager } from "./mechanicTableForManager";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuth } from "../../redux/pageSlice";
import axios from "axios";
import { useState, useEffect } from "react";
import { ManagerSideBar } from "./managerSiderbar";
import { Navbar } from "./navbar";
import { TopicMenu } from "./inventory/topicMenu";
import { ViewInventory } from "./inventory/viewInventory";
import { MyChart } from "./inventory/analysis";
import { PartIssue } from "./inventory/partIssue";
export const ManagerHomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const[condition,setCondition]=useState(false)
  const [supervisorData, setsupervisorData] = useState(null);
  const[downTimeInMinutes,setDownTimeInMinutes]=useState([])
  const [totalDownTime, setTotalDownTime] = useState(0);
  const topics = [
    <MechanicTableForManager data={condition && data} />,
    <PartIssue data={PartIssue}/>,
    <ViewInventory />,
    <MyChart downtimeData={downTimeInMinutes && downTimeInMinutes} />,
  ];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const handleLogout = () => {
    dispatch(isAuth(false));
    navigate("/");
    localStorage.clear();
  };

  useEffect(() => {
    let superviser=[]
    axios
    .get("http://localhost:5000/api/supervisor_table")
    .then((res) => superviser = res.data);
    // setCondition(true)
    axios
      .get("http://localhost:5000/api/mechanic_table")
      .then((res) =>  getBreakDownTime(res.data,superviser));
   
  }, []);

  const getBreakDownTime = (data ,supervisorData1) => {
    setCondition(true)
    const arr = [];
    let TotalTimeSum = 0;
   let obj =[];
    for (let i = 0; i < data.length; i++) {
      const startTime = new Date(supervisorData1[i].breakdown_start_time);
      const endTime = new Date(data[i].breakdown_end_time);
      console.log(startTime, endTime, "booth times");
      const diffTime = Math.abs(endTime - startTime);
      // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      var ms = diffTime,
        min = (Math.floor((ms / 1000 / 60) << 0))
        // sec = Math.floor((ms / 1000) % 60);
        TotalTimeSum += min;
      arr.push((min / 60).toFixed(2));
      data[i].breakdown_time = arr[i];
      console.log(startTime.getDate(),'ppppppppppppppppppppppppp')
      obj.push([startTime.getDate(),min,data[i].line_number])
    }
    setData(data)
    setCondition(true)
    // if(totalDownTime)
    setTotalDownTime(TotalTimeSum);
    if (arr) {
      console.log(obj,'oooobbbbjjj')
      setDownTimeInMinutes(obj)
      console.log(arr, "l",data);
    }
  };
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
        <h2>Manager & Executive (Seniors)</h2>
      </div>
      {/* <Button onClick={getBreakDownTime}>Calculate BreakdownTime</Button> */}
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Card title="Downtime Status" bordered={false} style={{ width: 300 }}>
          <p>
            Downtime duration:{" "}
            <span>{(totalDownTime / 60).toFixed(2)} hours</span>{" "}
          </p>
        </Card>
      </div>
      ,
      <Button
        style={{ margin: "2%", float: "right" }}
        type="primary"
        onClick={handleLogout}
      >
        Logout
      </Button>
      <Navbar menu={Menu} />
      <Layout>
        <ManagerSideBar menu={Menu} />
        <Layout.Content className="content">
          {topics[contentIndex]}
        </Layout.Content>
      </Layout>
    </>
  );
};

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
