import React, {useEffect} from "react";
import { Button } from 'antd';
import  {Html5Qrcode} from "html5-qrcode";
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {scannerData,mechanic_name} from '../../redux/pageSlice'
import styles from './pageStyle.module.css'
export const Scanner = (props) => {
    const dispatch = useDispatch();
    const designation_type = useSelector(state=>state.pageReducer.degination_type)
    const navigate = useNavigate('');
    const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
    let html5QrCode;

    useEffect(() => {
      html5QrCode = new Html5Qrcode("reader");
      getCameras();
      const oldRegion = document.getElementById("qr-shaded-region");
      oldRegion && oldRegion.remove();
    }, []);
  
    const handleClickAdvanced = () => {
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        let v= JSON.parse(JSON.stringify(decodedText));
        const b = JSON.parse(v)
        console.log('hello')
        console.log(b,'on Camera')
        const jag = ['1','2','3'];
        const amit = ['4','5','6'];
        const sunin_pal = ['7','8'];
        const harkesh = ['9','10','11'];
        const mikail = ['12','13','14'];
        const nafish = ['15','38'];
        const jitendra = ['16','17'];
        const vasid = ['18','19','20'];
        const manoj = ['21','22','23'];
        const ram_mahesh = ['24','25','26','27'];
        const vikram = ['28','29','30',];
        const adil = ['31','32','33',];
        const yoginder = ['24','35','36',];
              
              console.log(b.machine_type,'bbbbbbb')
              console.log(b,"+++++++++++white something saying",b.line_no)
              if(jag.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Jagvinder'))
              }
              else if(amit.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Amit'))
              }
              else if(sunin_pal.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Sunil Pal'))
              }
              else if(harkesh.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Harkesh'))
              }
              else if(mikail.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Mikail'))
              }
              else if(nafish.find(i=>i===b.line_no)){
                  console.log('im her')
                  dispatch(mechanic_name('Nafish'))
              }
              else if(jitendra.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Jitendra'))
              }
              else if(vasid.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Vasid'))
              }
              else if(manoj.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Manoj'))
              }
              else if(ram_mahesh.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Ram Mahesh'))
              }
              else if(vikram.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Vikram'))
              }
              else if(adil.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Adil'))
              }
              else if(yoginder.find(i=>i===b.line_no)){
                  dispatch(mechanic_name('Yoginder'))
              }
              else{
                  console.log('i am in else condition000000000000')
              }
              dispatch(scannerData(b));
              console.log(designation_type,'innn qrcode page')
              if(designation_type==="Machanic"){
                  navigate("/mechanic", { replace: true });
              }else{
                  navigate('/supervisor')
              }  
          handleStop();
        };
      html5QrCode
        .start(
          { facingMode: "environment" },
          props.type === "QR" ? qrConfig : brConfig,
          qrCodeSuccessCallback
        )
        .then(() => {
        });
    };
    const getCameras = () => {
      Html5Qrcode.getCameras()
        .then((devices) => {
          console.info(devices);
          if (devices && devices.length) {
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
   
    const handleStop = () => {
      try {
        html5QrCode
          .stop()
          .then((res) => {
            html5QrCode.clear();
          })
          .catch((err) => {
            console.log(err.message);
          });
      } catch (err) {
        console.log(err);
      }
    };
   
  
    return (
      <div style={{ position: "relative" }}>
        <div id="reader" width="100%"></div>
         <div style={{backgroundColor:"whitesmoke"}}>
      <h1 >Scan your qr code</h1>
        <Button type='primary' className={styles.qr_btn} onClick={() => handleClickAdvanced()}>
          click pro {props.type}
        </Button>
        <Button type='primary' className={styles.qr_btn} onClick={() => handleStop()}>stop pro</Button>
        </div>
      </div>
    );
  };