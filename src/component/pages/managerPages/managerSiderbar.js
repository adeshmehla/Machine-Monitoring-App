import React from "react";
import { Layout } from "antd";
// import "./SideBar.css"
export const ManagerSideBar = ({ menu }) => {
  return (
    <Layout.Sider
      className="sidebar"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
    >
      {menu}
   </Layout.Sider>
   );
};