const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors");
const jwt = require('jsonwebtoken');
const jwtKey = 'e-com';
flash = require('express-flash')
app.cors = require("cors");
var router = express.Router();
// let startTime;
let endTime;
const db = mysql.createPool({
  host:"localhost",
  user:"root",
  password:"Mysql@000",
  database:"user_auth"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/api/login",(req,res)=>{
  const sqlGet = "SELECT * FROM auth_db";
  db.query(sqlGet,(error,result)=>{
    res.send(result);
    console.log(res,'result',result)
  });
});
app.get("/api/mechanic_table",(req,res)=>{
  const sqlGet = "SELECT * FROM mechanic_db";
  db.query(sqlGet,(error,result)=>{
    res.send(result);
    console.log(res,'result',result)
  });
});
app.get("/api/supervisor_table",(req,res)=>{
  const sqlGet = "SELECT * FROM supervisor_db";
  db.query(sqlGet,(error,result)=>{
    res.send(result);
    console.log(res,'result',result)
  });
});
// router.post("/api/signup",(req,res)=>{
//   const {employee_name,card_number,password} = req.body;
//   console.log(req,'payload')
//     const sqlInsert = 
//   "INSERT INTO auth_db (card_number,password) VALUES (?,?)";
//   db.query(sqlInsert,[employee_name,card_number,password],(error,result)=>{
//     if(error){
//       console.log(error,'error')
//     }
//   });
// });


app.post("/api/mechanic",(req,res)=>{
  const {line_number,machine_number,machine_type,operation,breakdown_reason,action_taken,part_replaced,number_of_spare_parts,breakdown_end_time} = req.body;


    const sql = 
    `INSERT INTO user_auth.mechanic_db (line_number,machine_number,machine_type,operation,breakdown_reason,action_taken,part_replaced,number_of_spare_parts,breakdown_end_time) VALUES ("${line_number}", "${machine_number}", "${machine_type}", "${operation}","${breakdown_reason}","${action_taken}","${part_replaced}", "${number_of_spare_parts}","${breakdown_end_time}")`
  //  console.log(sql,'ppppppp')
    db.query(sql, function (err, result) {
      
      if (err) throw err
      console.log('Row has been updated')
      flash('success', 'Data stored!')
      res.redirect('/')
    })
});
/////////////////////////////////////////////////////////////////////////////////////
app.post("/api/supervisor",(req,res)=>{
  const {line_number,machine_number,mechanic_name,breakdown_start_time} = req.body;
  startTime = breakdown_start_time
  // console.log(req,'payload')
    const sql = 
    `INSERT INTO user_auth.supervisor_db (line_number,machine_number,mechanic_name,breakdown_start_time) VALUES ("${line_number}", "${machine_number}", "${mechanic_name}","${breakdown_start_time}")`
  //  console.log(sql,'supervisor')
    db.query(sql, function (err, result) {
      
      if (err) throw err
      console.log('Row has been updated',result)
      flash('success', 'Data stored!')
      res.redirect('/')
    })
});

///////////////////////////////////////////////////////////
app.put('/api/mechanic', (req, res) => {
  const id = req.body.id
  const breakdown_time = req.body.breakdown_time
  console.log(value)
  db.query(
   `UPDATE user_auth.mechanic_db SET breakdown_time = ${breakdown_time} WHERE id = ${id} `,
   [id,breakdown_time],
 (err, result) => {
   if (err) {
     console.log(err)
   } else {
     res.send(result)
    // console.log(result,'-------')
   }
 }
 )})


app.get("/", (req, res) => {
  // const sqlInsert = 
  // "INSERT INTO auth_db (name,card_number,password) VALUES ('user1','user@test.com','88999000')";
  // db.query(sqlInsert,(err,result)=>{
  //   console.log(err,"error");
  //   console.log(result,"result");
    res.send("hello world1");
  // })
});

app.listen(5000, () => {
  console.log("running on port 5000");
});
