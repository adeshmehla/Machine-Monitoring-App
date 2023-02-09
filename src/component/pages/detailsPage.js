import { Table } from "antd";
import { useEffect, useState } from "react";
export const DetailsPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const data = localStorage.getItem("userData");
    // setData(JSON.parse(data));
    const b = JSON.parse(data);
    console.log(b);
    setData(b);
  }, []);

  // const dataSource = data

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Email",
      dataIndex: "email_address",
      key: "address"
    },
    {
      title: "Introduction",
      dataIndex: "introduction",
      key: "introduction"
    }
  ];
  return <>{data && <Table dataSource={data} columns={columns} />}</>;
};
