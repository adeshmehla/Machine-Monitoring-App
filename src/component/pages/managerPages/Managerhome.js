import { Button,Card } from 'antd'
import style from './managerHome.module.css'
import React from 'react'
import { MechanicTable } from './mechanicTable'

export const ManagerHomePage=()=>{
  return (
    <>
    <div className={style.mainHeading}>
    <h2 >Manager & Executive (Seniors)</h2>
    </div>
    <div style={{ background: '#ECECEC', padding: '30px' }}>
    <Card title="Downtime Status" bordered={false} style={{ width: 300 }}>
      <p>Total Downtime: <span>40 Minutes</span> </p>
    </Card>
  </div>,
        <Button style={{margin:"2%",float:"right"}} type='primary'>Logout</Button>
   <MechanicTable/>
    </>
  )
}
