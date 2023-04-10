import React, { useState } from "react";
import { Chart } from "react-charts";
import { Table, Form, Input, Select, Button } from "antd";
import { useEffect } from "react";
export const MyChart = ({ downtimeData }) => {
  const [day, setDay] = useState([]);
  const [breakdownCountForMachine, setBreakdownCountForMachine] =
    useState(null);
  const [occurrenceOfLine, setOccurrenceOfLine] = useState({});
  // const uniqueLines = Object.keys(occurrenceOfLine);
 
  const lineWiseDowntimeSeries = React.useMemo(
    () => ({
      type: "bar",
      xKey: "date",
      yKey: "day",
    }),
    []
  );
  const series1 = React.useMemo(
    () => ({
      type: "bar",
      xKey: "date",
      yKey: "day",
    }),
    []
  );
  const monthlyMTTRLineWiseSeries = React.useMemo(
    () => ({
      type: "bar",
      xKey: "date",
      yKey: "day",
    }),
    []
  );

  const dayWiseDowntimeData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        // data: [[1,3],[2,3],[3,7]],
        data: downtimeData.map((i) => [i[0], i[1]]),
      },
    ],
    []
  );
  const dayWiseNoOfBreakdownData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        // data: [[1,3],[2,3],[3,7]],
        data: downtimeData.map((i) => [i[2], i[1]]),
      },
    ],
    []
  );
  const lineWiseDowntimeData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        data: downtimeData.map((i) => [i[2], i[0]]),
      },
    ],
    []
  );
  const monthlyNoOfBreakdownLineWiseData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        data: breakdownCountForMachine
          ? breakdownCountForMachine
          : downtimeData.map((i) => [i[2], i[0]]),
      },
    ],
    []
  );
  const monthlyMTTRLineWiseData = React.useMemo(
    () => [
      {
        label: "Downtime Minutes",
        data: breakdownCountForMachine
          ? breakdownCountForMachine
          : downtimeData.map((i) => [i, i[1]]),
      },
    ],
    []
  );

  const dayWiseDowntimeAxes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const dayWiseNoOfBreakdownAxes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );
  const lineWiseDowntimeAxes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear" },
    ],
    []
  );
  const monthlyNoOfBreakdownLineWiseAxes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear" },
    ],
    []
  );
  const monthlyMTTRLineWiseAxes = React.useMemo(
    () => [
      { primary: true, type: "ordinal", position: "bottom" },
      { position: "left", type: "linear" },
    ],
    []
  );
  // const lineChart = (
  // A react-chart hyper-responsively and continuously fills the available
  // space of its parent element automatically
  useEffect(() => {
    // setDay();
    const counts = {};
    console.log(downtimeData,'useEffect')
    let arr = downtimeData.map((i) => i[2]);
    for (const num of arr) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    // setOccurrenceOfLine(counts)
    const uniqueLines = Object.keys(counts);
    setBreakdownCountForMachine(uniqueLines.map((i) => [i, counts[i]]));
    // setBreakdownCountForMachine(b);
    // console.log(breakdownCountForMachine,'opppoopp');
    console.log(uniqueLines.map((i) => [i, counts[i]]));
    // console.log(arr2.length,counts[2],'00000',Object.keys(counts));
  }, [downtimeData]);
  const onFinish = () => {
    console.log("search");
  };
  return (
    <>
      <div
        style={{
          width: "90%",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>View Breakdown TIme</h2>
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
          <Form.Item name="Machine_no" label="Machine No.">
           <Input/>
          </Form.Item>
          <Form.Item name="machine_type" label="Type Of Machine">
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
          flexDirection: "row",
          flexWrap: "wrap",
          columnGap: "1%",
          rowGap: "76px"
      
        }}
      >
        <div
          style={{
            width: "45%",
            height: "300px",
            margin: "2%",
          }}
        >
          <Chart
            tooltip
            style={{ width: "90%" }}
            data={dayWiseDowntimeData}
            // series={series}
            axes={dayWiseDowntimeAxes}
          />
          <p style={{ textAlign: "center" }}>Day</p>
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
            Breakdown Time in Minutes
          </p>
          {/* <Chart style={{width:"90%",margin:"2%"}} series={series} data={secondChartData} axes={secondAxes} /> */}
        </div>
        <div
          style={{
            width: "45%",
            height: "300px",
            margin: "2%",
          }}
        >
          {/* <Chart style={{width:"90%",margin:"2%"}} data={firstChartData} axes={firstAxes} /> */}

          <Chart
            tooltip
            style={{ width: "90%" }}
            series={lineWiseDowntimeSeries}
            data={lineWiseDowntimeData}
            axes={lineWiseDowntimeAxes}
          />
          <p style={{ textAlign: "center" }}>Sewing Line Number</p>

          <p
            style={{
              textAlign: "center",
              margin: "2%",
              float: "right",
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
        </div>
        {/* //////////////////////////////////////////////// */}
        <div
          style={{
            width: "45%",
            height: "300px",
            margin: "2%",
          }}
        >
          {/* <Chart style={{width:"90%",margin:"2%"}} data={firstChartData} axes={firstAxes} /> */}

          <Chart
            tooltip
            style={{ width: "80%" }}
            series={series1}
            
            data={monthlyNoOfBreakdownLineWiseData}
            axes={monthlyNoOfBreakdownLineWiseAxes}
          />
          <p style={{ textAlign: "center" }}> Sewing Line Number</p>
          <p
            style={{
              textAlign: "center",
              margin: "2%",
              float: "right",
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
            No of Breakdowns
          </p>
        </div>
        {/* ///////////////////////////////////////////////////////////////////// */}
        <div
          style={{
            width: "45%",
            height: "300px",
            margin: "2%",
          }}
        >
          {/* <Chart style={{width:"90%",margin:"2%"}} data={firstChartData} axes={firstAxes} /> */}

          <Chart
            tooltip
            style={{ width: "90%" }}
            data={dayWiseNoOfBreakdownData}
            axes={dayWiseNoOfBreakdownAxes}
          />
          <p style={{ textAlign: "center" }}> Sewing Line Number</p>
          <p
            style={{
              textAlign: "center",
              margin: "2%",
              float: "right",
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
            No of Breakdowns
          </p>
        </div>
        {/* ///////////////////////////////////////////////////////////////////// */}
        <div
          style={{
            width: "45%",
            height: "300px",
            margin: "2%",
          }}
        >
          {/* <Chart style={{width:"90%",margin:"2%"}} data={firstChartData} axes={firstAxes} /> */}

          <Chart
            tooltip
            style={{ width: "90%" }}
            data={monthlyMTTRLineWiseData}
            axes={monthlyMTTRLineWiseAxes}
            series={monthlyMTTRLineWiseSeries}
          />
          <p style={{ textAlign: "center" }}> Monthly MTTR Line Wise</p>
          <p
            style={{
              textAlign: "center",
              margin: "2%",
              float: "right",
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
           MTTR
          </p>
        </div>
      </div>
    </>
  );
};
