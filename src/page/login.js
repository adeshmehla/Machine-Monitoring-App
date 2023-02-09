// import { Button, Form, Input } from "antd";
// // import { useNavigate } from "react-router-dom";

// import "./pageStyle.css";
// export const Login = () => {
//   // const navigate = useNavigate();
//   const layout = {
//     labelCol: {
//       span: 8
//     },
//     wrapperCol: {
//       span: 16
//     }
//   };

//   // const validateMessages = {
//   //   required: "${label} is required!",
//   //   types: {
//   //     email: "${label} is not a valid email!",
//   //     number: "${label} is not a valid number!"
//   //   },
//   //   number: {
//   //     range: "${label} must be between ${min} and ${max}"
//   //   }
//   // };

//   const onFinish = (values) => {
//     console.log(values, "login Data++++++++++++");
//   };

//   return (
//     <>
//       <div className="login_container">
//         <h2>Login</h2>
//         <Form
//           // {...layout}
//           layout="vertical"
//           name="nest-messages"
//           onFinish={onFinish}
//           style={{
//             maxWidth: 600
//           }}
//           // validateMessages={validateMessages}
//         >
//           <Form.Item
//             name={["user", "email_address"]}
//             label="Email"
//             rules={[
//               {
//                 type: "email"
//               }
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             name={["user", "password"]}
//             label="Password"
//             rules={[
//               {
//                 required: true
//               }
//             ]}
//           >
//             <Input />
//           </Form.Item>
//           <Form.Item
//             wrapperCol={{
//               ...layout.wrapperCol,
//               off