const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2")
const cors = require("cors");
app.cors = require("cors");

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
    // console.log(res,'result',result)
  });
});
app.post("/api/signup",(req,res)=>{
  const {employee_name,card_number,password} = req.body;
  console.log(req,'payload')
    const sqlInsert = 
  "INSERT INTO auth_db (card_number,password) VALUES (?,?)";
  db.query(sqlInsert,[employee_name,card_number,password],(error,result)=>{
    if(error){
      console.log(error,'error')
    }
  });
});

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
