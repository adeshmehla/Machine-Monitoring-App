import React from "react";
import { Chart } from "react-charts";
import { Table, Form, Input, Select, Button } from "antd";
export const MyChart = ({ downtimeData }) => {
  const series = React.useMemo(
    () => ({
      type: "bar",
      xKey: "date",
      yKey: "day",
    }),
    []
  );

  const firstChartData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        data: [
          [1, 1],
          [2, 4],
          [3, 3],
          [4, 4],
        ],
      },
    ],
    []
  );
  const secondChartData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        data: [
          [1, 0],
          [1, 3],
          [2, 2],
          [3, 1],
          [4, 4],
          [5, 3],
        ],
      },
    ],
    []
  );

  const firstAxes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const secondAxes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear" },
    ],
    []
  );
  // const lineChart = (
  // A react-chart hyper-responsively and continuously fills the available
  // space of its parent element automatically

  const onFinish = () => {
    console.log("search");
  };
  return (
    <>
      <div
        style={{
          width: "95%",
          marginBottom: "20px",
        }}
      >
        <h2 style={{textAlign:"center"}}>View Breakdown TIme</h2>
        <Form
          //   className="tool_record_form"
          name="tool-form"
          layout="inline"
          onFinish={onFinish}
          // style={{
          //   maxWidth: 1200,
          // }}
          // initialValues={{
          //   price: {
          //     number: 0,
          //     currency: 'rmb',
          //   },
          // }}
        >
          <Form.Item name="category" label="Category">
            <Select style={{ width: "120px" }}>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo">Demo2</Select.Option>
              <Select.Option value="demo">Demo3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="for_machine" label="For Machine">
            <Select style={{ width: "120px" }}>
              <Select.Option value="demo">Demo</Select.Option>
              <Select.Option value="demo">Demo2</Select.Option>
              <Select.Option value="demo">Demo3</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="part_code" label="Part Code">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button className="search_btn" htmlType="submit">
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            width: "50%",
            height: "300px",
            margin: "2%",
          }}
        >
          <Chart
            tooltip
            style={{ width: "90%" }}
            data={firstChartData}
            axes={firstAxes}
          />
          <p style={{ textAlign: "center" }}>day</p>
          <p
            style={{
              textAlign: "center",
              margin: "2%",
              display: "inline-block",
            }}
          >
            <div
              style={{
                margin: "0px 250px",
                width: "22px",
                height: "2px",
                backgroundColor: "rgb(74, 181, 235)",
              }}
            ></div>{" "}
            Downtime
          </p>
          {/* <Chart style={{width:"90%",margin:"2%"}} series={series} data={secondChartData} axes={secondAxes} /> */}
        </div>
        <div
          style={{
            width: "50%",
            height: "300px",
            margin: "2%",
          }}
        >
          {/* <Chart style={{width:"90%",margin:"2%"}} data={firstChartData} axes={firstAxes} /> */}

          <Chart
            tooltip
            style={{ width: "90%" }}
            series={series}
            data={secondChartData}
            axes={secondAxes}
          />
          <p style={{ textAlign: "center" }}>day</p>
        </div>
      </div>
          <p
            style={{
              textAlign: "center",
              margin: "2%",
              float:"right",
              display: "inline-block",
            }}
          >
            <div
              style={{
                margin: "0px 250px",
                width: "20px",
                height: "12px",
                backgroundColor: "rgb(74, 181, 235)",
              }}
            ></div>{" "}
            Downtime
          </p>
    </>
  );
};
