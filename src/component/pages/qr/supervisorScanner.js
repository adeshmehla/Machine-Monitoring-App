
import React, { useEffect, useState, useRef } from "react";
import styles from './pageStyle.module.css'
import {Button} from 'antd'
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isAuth } from "../../redux/pageSlice";
// import {scannerData,mechanic_name, breakdownStartTime} from '../../redux/pageSlice'
// import { getCameraList } from "./Utils";

const qrConfig = { fps: 10, qrbox: { width: 350, height: 400 } };
let html5QrCode;

// function startCamera(){}

export const SupervisorScanner = () => {
  const fileRef = useRef(null);
  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  // const [cameraList, setCameraList] = useState([]);
  // const [activeCamera, setActiveCamera] = useState();
  useEffect(() => {
    html5QrCode = new Html5Qrcode("reader");
    getCameras();
    const oldRegion = document.getElementById("qr-shaded-region");
    oldRegion && oldRegion.remove();
   console.log('hello')
  },[]);

  const handleClickAdvanced = () => {
    const today = new Date();
    // setHour(today.getHours());
    // setMinute(today.getMinutes());
    // setSecond(today.getSeconds());
    // dispatch(breakdownStartTime(today))
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      let v= JSON.parse(JSON.stringify(decodedText));
              const b = JSON.parse(v)
      // dispatch(scannerData(b));
      console.log(b,'oooooooooooooooo')
      navigate('/supervisor')
      handleStop();
    };
    html5QrCode
      .start(
        { facingMode: "environment" },
      qrConfig,
        qrCodeSuccessCallback
      )
      .then(() => {
        // const oldRegion = document.getElementById("qr-shaded-region");
        // if (oldRegion) oldRegion.innerHTML = "";
      });
  };
  const getCameras = () => {
    Html5Qrcode.getCameras()
      .then((devices) => {
        /**
         * devices would be an array of objects of type:
         * { id: "id", label: "label" }
         */
        // console.info(devices);
        // if (devices && devices.length) {
        //   // setCameraList(devices);
        //   // setActiveCamera(devices[0]);
        // }
      })
      .catch((err) => {
        console.error(err);
        // setCameraList([]);
      });
  };
  // const onCameraChange = (e) => {
  //   if (e.target.selectedIndex) {
  //     let selectedCamera = e.target.options[e.target.selectedIndex];
  //     console.info(selectedCamera);
  //     let cameraId = selectedCamera.dataset.key;
  //     setActiveCamera(cameraList.find((cam) => cam.id === cameraId));
  //   }
  // };
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
  const scanLocalFile = () => {
    fileRef.current.click();
  };
  const scanFile = (e) => {
    if (e.target.files.length === 0) {
      // No file selected, ignore
      return;
    }

    // Use the first item in the list
    const imageFile = e.target.files[0];
    console.info(imageFile);
    html5QrCode
      .scanFile(imageFile, /* showImage= */ true)
      .then((qrCodeMessage) => {
        // success, use qrCodeMessage
        // console.log(qrCodeMessage,'ppoooooo');
        html5QrCode.clear();
      })
      .catch((err) => {
        // failure, handle it.
        console.log(`Error scanning file. Reason: ${err}`);
      });
  };

  const handleLogout = ()=>{
    dispatch(isAuth(false))
     navigate('/')
     localStorage.clear()
   }

  return (
    <div style={{ position: "relative" }}>
      <Button style={{backgroundColor:"rgb(49, 216, 77)",margin:"2%"}} onClick={handleLogout}>Logout</Button>
    <div id="reader" width="100%"></div>
     <div style={{backgroundColor:"whitesmoke",textAlign:"center",position:'relative',padding:"20% 0"}}>
  <h1>Scan your qr code</h1>
  <Button type='primary' className={styles.qr_btn} onClick={() => handleClickAdvanced()}>
      scan machine
    </Button>
  
   <Button type='primary' className={styles.qr_btn} onClick={() => handleStop()}>stop</Button>
  
    </div>
  </div>
  );
};