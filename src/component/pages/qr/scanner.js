// import React, {useEffect,useState,useRef} from "react";
// import { Button } from 'antd';
// import { Html5Qrcode } from "html5-qrcode";
// import { useNavigate } from 'react-router-dom';
// import {useSelector,useDispatch} from 'react-redux';
// import {scannerData,mechanic_name} from '../../redux/pageSlice'
// import styles from './pageStyle.module.css'
// export const Scanner = () => {
//   const[cameraStart,setCameraStart]=useState(false);
//     const dispatch = useDispatch();
//     const designation_type = useSelector(state=>state.pageReducer.degination_type)
//     const navigate = useNavigate('');
//     const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
//     let html5QrCode;

//     useEffect(() => {
//       html5QrCode = new Html5Qrcode("reader");
//       getCameras();
//       const oldRegion = document.getElementById("qr-shaded-region");
//       oldRegion && oldRegion.remove();
//     }, []);
  
//     // const handleClickAdvanced = () => {
//     //   console.log(html5QrCode,'ppppppppppppppppppppp'),
//     //   setCameraStart(true)
//     //   const qrCodeSuccessCallback = (decodedText, decodedResult) => {
//     //     let v= JSON.parse(JSON.stringify(decodedText));
//     //     const b = JSON.parse(v)
//     //           dispatch(scannerData(b));
//     //           console.log(designation_type,'innn qrcode page')
//     //           if(designation_type==="Machanic"){
//     //               navigate("/mechanic", { replace: true });
//     //           }else{
//     //               navigate('/mechanic')
//     //           }  
//     //       handleStop();
//     //     };
//     //   html5QrCode
//     //     .start(
         
//     //       { facingMode: "environment" },
//     //        qrConfig,
//     //       qrCodeSuccessCallback
//     //     )
//     //     .then(() => {
//     //     });
//     // };

//     const handleClickAdvanced = () => {
//       const qrCodeSuccessCallback = (decodedText, decodedResult) => {
//         console.info(decodedResult, decodedText);
       
//         let v= JSON.parse(JSON.stringify(decodedText));
//         const b = JSON.parse(v)
//               dispatch(scannerData(b));

//         handleStop();
//       };
//       html5QrCode
//         .start(
//           { facingMode: "environment" },
//          qrConfig,
//           qrCodeSuccessCallback
//         )
//         .then(() => {
//           navigate('/mechanic')
//         });
//     };




//     const getCameras = () => {
//       Html5Qrcode.getCameras()
//         .then((devices) => {
//           /**
//            * devices would be an array of objects of type:
//            * { id: "id", label: "label" }
//            */
//           console.info(devices);
//           if (devices && devices.length) {
//             // setCameraList(devices);
//             setActiveCamera(devices[0]);
//           }
//         })
//         .catch((err) => {
//           console.error(err);
//           setCameraList([]);
//         });
//     };
   
//     const handleStop = () => {
//       try {
//         html5QrCode
//           .stop()
//           .then((res) => {
//             html5QrCode.clear();
//           })
//           .catch((err) => {
//             console.log(err.message);
//           });
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     return (
//       <div style={{ position: "relative" }}>
//         <div id="reader" width="100%"></div>
//          <div style={{backgroundColor:"whitesmoke",textAlign:"center"}}>
//       <h1>Scan your qr code</h1>
//       {!cameraStart?<Button type='primary' className={styles.qr_btn} onClick={() => handleClickAdvanced()}>
//           scan machine
//         </Button>:null}
//        {cameraStart?
//        <Button type='primary' className={styles.qr_btn} onClick={() => handleStop()}>stop</Button>
//        :null}
      
//         </div>
//       </div>
//     );
//   };





///////////////////////////////////////////////////////////////



  import React, { useEffect, useState, useRef } from "react";
import styles from './pageStyle.module.css'
import {Button} from 'antd'
import { Html5Qrcode } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {scannerData,mechanic_name} from '../../redux/pageSlice'
// import { getCameraList } from "./Utils";

const qrConfig = { fps: 10, qrbox: { width: 350, height: 400 } };
let html5QrCode;

// function startCamera(){}

export const Scanner = () => {
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
      navigate('/mechanic')
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

  return (
    <div style={{ position: "relative" }}>
    <div id="reader" width="100%"></div>
     <div style={{backgroundColor:"whitesmoke",textAlign:"center"}}>
  <h1>Scan your qr code</h1>
  {/* <Button type='primary' className={styles.qr_btn} onClick={() => handleClickAdvanced()}>
      scan machine
    </Button>
  
   <Button type='primary' className={styles.qr_btn} onClick={() => handleStop()}>stop</Button> */}
  
    </div>
  </div>
  );
};

























//   <div style={{ position: "relative" }}>
//   <div id="reader" width="100%"></div>
//    <div style={{backgroundColor:"whitesmoke",textAlign:"center"}}>
// <h1>Scan your qr code</h1>
// {!cameraStart?<Button type='primary' className={styles.qr_btn} onClick={() => handleClickAdvanced()}>
//     scan machine
//   </Button>:null}
//  {cameraStart?
//  <Button type='primary' className={styles.qr_btn} onClick={() => handleStop()}>stop</Button>
//  :null}

//   </div>
// </div>


