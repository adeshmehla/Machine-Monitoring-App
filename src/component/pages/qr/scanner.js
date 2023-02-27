import React, {useEffect,useRef,useState} from "react";
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {scannerData,mechanic_name} from '../../redux/pageSlice'
import  {Html5Qrcode} from "html5-qrcode";
export const Scanner = (props) => {
  const [file, setfile] = useState(null);
    const [decodedValue, setDecodedValue] = useState("");
    // const [data, setData] = useState(null);
    const[scanResultWebCam,setScanResultWebCam]=useState('')
    const dispatch = useDispatch();
    const designation_type = useSelector(state=>state.pageReducer.degination_type)
    const navigate = useNavigate('');
    const fileRef = useRef()
    // const fileRef = useRef(null);
    const qrConfig = { fps: 10, qrbox: { width: 300, height: 300 } };
    let html5QrCode;
    // const [cameraList, setCameraList] = useState([]);
    // const [activeCamera, setActiveCamera] = useState();
    useEffect(() => {
      html5QrCode = new Html5Qrcode("reader");
      getCameras();
      const oldRegion = document.getElementById("qr-shaded-region");
      oldRegion && oldRegion.remove();
    }, []);
  
    const handleClickAdvanced = () => {
      const qrCodeSuccessCallback = (decodedText, decodedResult) => {
        console.info(decodedResult, decodedText);
        props.onResult(decodedText);
        alert(`decoded:__ ${decodedText} ${decodedResult}`);
        ////////////////////////////////////////////////////
        fileRef.current.click();
        // const b = JSON.stringify(decodedResult);
        // alert(b);
     
      // const jag = ['1','2','3'];
      // const amit = ['4','5','6'];
      // const sunin_pal = ['7','8'];
      // const harkesh = ['9','10','11'];
      // const mikail = ['12','13','14'];
      // const nafish = ['15','38'];
      // const jitendra = ['16','17'];
      // const vasid = ['18','19','20'];
      // const manoj = ['21','22','23'];
      // const ram_mahesh = ['24','25','26','27'];
      // const vikram = ['28','29','30',];
      // const adil = ['31','32','33',];
      // const yoginder = ['24','35','36',];
      // const handleScaner=async (e)=>{
          // const file = e.target.files[0];
          // setfile(file);
          // const result = await QrScanner.scanImage(file);
          if(decodedText){
              // const b = result.split(" ")[0]
              if(file){
                  localStorage.setItem('qr_scannerData',decodedText)
              }
              // setData(result.split(""))
              console.log(decodedText,"+++++++++++white something saying",JSON.parse(b).line_no)
              // if(jag.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Jagvinder'))
              // }
              // else if(amit.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Amit'))
              // }
              // else if(sunin_pal.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Sunil Pal'))
              // }
              // else if(harkesh.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Harkesh'))
              // }
              // else if(mikail.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Mikail'))
              // }
              // else if(nafish.find(i=>i===JSON.parse(b).line_no)){
              //     console.log('im her')
              //     dispatch(mechanic_name('Nafish'))
              // }
              // else if(jitendra.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Jitendra'))
              // }
              // else if(vasid.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Vasid'))
              // }
              // else if(manoj.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Manoj'))
              // }
              // else if(ram_mahesh.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Ram Mahesh'))
              // }
              // else if(vikram.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Vikram'))
              // }
              // else if(adil.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Adil'))
              // }
              // else if(yoginder.find(i=>i===JSON.parse(b).line_no)){
              //     dispatch(mechanic_name('Yoginder'))
              // }
              // else{
              //     console.log('i am in else condition000000000000')
              // }
              dispatch(scannerData(decodedText));
              console.log(designation_type,'innn qrcode page')
              if(designation_type==="Machanic"){
                  // navigate('/machanic')
                  navigate("/mechanic", { replace: true });
              }else{
                  navigate('/supervisor')
              }
  
          }
        };
        handleStop();
      html5QrCode
        .start(
          { facingMode: "environment" },
          props.type === "QR" ? qrConfig : brConfig,
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
            // setCameraList(devices);
            // setActiveCamera(devices[0]);
          }
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
    // const scanLocalFile = () => {
    //   fileRef.current.click();
    // };
    // const scanFile = (e) => {
    //   if (e.target.files.length === 0) {
    //     // No file selected, ignore
    //     return;
    //   }
  
    //   // Use the first item in the list
    //   const imageFile = e.target.files[0];
    //   console.info(imageFile);
    //   html5QrCode
    //     .scanFile(imageFile, /* showImage= */ true)
    //     .then((qrCodeMessage) => {
    //       // success, use qrCodeMessage
    //       console.log(qrCodeMessage);
    //       props.onResult(qrCodeMessage);
    //       html5QrCode.clear();
    //     })
    //     .catch((err) => {
    //       // failure, handle it.
    //       console.log(`Error scanning file. Reason: ${err}`);
    //     });
    // };
  
    return (
      <div style={{ position: "relative" }}>
        <div id="reader" width="100%"></div>
        {/* <button onClick={getCameras}>Get List of cameras</button>
        {cameraList.length > 0 && (
          <select onChange={onCameraChange}>
            {cameraList.map((li) => (
              <option
                key={li.id}
                id={li.id}
                selected={activeCamera && activeCamera.id === li.id}
              >
                {li.label}
              </option>
            ))}
            <option>Dummy</option>
          </select>
        )} */}
        <button onClick={() => handleClickAdvanced()}>
          click pro {props.type}
        </button>
        <button onClick={() => handleStop()}>stop pro</button>
        <br />
        <br />
        {/* <button onClick={scanLocalFile}>Scan local file</button> */}
        {/* <input
          type="file"
          hidden
          ref={fileRef}
          accept="image/*"
          onChange={scanFile}
        /> */}
      </div>
    );
  };