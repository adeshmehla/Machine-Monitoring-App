import React, { useEffect, useState, useRef } from "react";
// import styles from './pageStyle.module.css'
// import {Button} from 'antd'
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {scannerData,mechanic_name} from '../../../redux/pageSlice'
// import { getCameraList } from "./Utils";

const qrConfig = { fps: 10, qrbox: { width: 350, height: 400 } };
let html5QrCode;

export const PartScanner = ({handleScaned}) => {
    const fileRef = useRef(null);
  
    const navigate = useNavigate()
    const [cameraList, setCameraList] = useState([]);
    const dispatch = useDispatch();
    const [activeCamera, setActiveCamera] = useState();
    useEffect(() => {
      html5QrCode = new Html5Qrcode("reader");
      getCameras();
      const oldRegion = document.getElementById("qr-shaded-region");
      oldRegion && oldRegion.remove();
    
      handleClickAdvanced()
    },[]);
  
    const handleClickAdvanced = () => {
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        let v= JSON.parse(JSON.stringify(decodedText));
                const b = JSON.parse(v)
        dispatch(scannerData(b));
        // navigate('/mechanic')
        handleStop();
        handleScaned(b);
      };
      html5QrCode
        .start(
          { facingMode: "environment" },
        qrConfig,
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
            setCameraList(devices);
            setActiveCamera(devices[0]);
          }
        })
        .catch((err) => {
          console.error(err);
          setCameraList([]);
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
       <div style={{backgroundColor:"whitesmoke",textAlign:"center"}}>
    <h1>Scan your qr code</h1>
      </div>
    </div>
    );
  };
  
  