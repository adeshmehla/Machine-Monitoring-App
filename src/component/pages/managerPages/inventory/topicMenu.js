import React from "react";
import {Menu} from "antd";
export const TopicMenu = ({ topics, selectedKey, changeSelectedKey }) => {
  const styledTopics = [];
  topics.forEach((topic, index) =>
    styledTopics.push(
     
    )
  );
  
  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
     <Menu.Item key={0} onClick={changeSelectedKey}>
        Home
      </Menu.Item>
     <Menu.Item key={1} onClick={changeSelectedKey}>
       Update Invetory (Part Issue)
      </Menu.Item>
     <Menu.Item key={2} onClick={changeSelectedKey}>
     View Inventory
      </Menu.Item>
     <Menu.Item key={3} onClick={changeSelectedKey}>
        View Breakdown Trends
      </Menu.Item>
    </Menu>
  );
  }