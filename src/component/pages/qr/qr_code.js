
import { Button } from 'antd';
import {useState,useRef, useEffect } from 'react';
import QrScanner  from 'qr-scanner';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {scannerData,mechanic_name} from '../../redux/pageSlice'
import styles from './pageStyle.module.css'
import { QrReader } from 'react-qr-reader';
import { Scanner } from './scanner';
export const QrCode=()=>{
    const [file, setfile] = useState(null);
    const [decodedValue, setDecodedValue] = useState("");
    // const [data, setData] = useState(null);
    const[scanResultWebCam,setScanResultWebCam]=useState('')
    const dispatch = useDispatch();
    const designation_type = useSelector(state=>state.pageReducer.degination_type)
    const navigate = useNavigate('');
    const fileRef = useRef()
    const openScaner=()=>{
       fileRef.current.click();
    }
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
    const handleScaner=async (e)=>{
       
    
        const file = e.target.files[0];
        setfile(file);
        const result = await QrScanner.scanImage(file);
        if(result.length){
            console.log(result,'resulttttttttttttttt')
            const b = result.split(" ")[0]
            if(file){
               
                localStorage.setItem('qr_scannerData',JSON.parse(b))
            }
            // setData(result.split(""))
            console.log(JSON.parse(b),"+++++++++++white something saying",JSON.parse(b).line_no)
            if(jag.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Jagvinder'))
            }
            else if(amit.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Amit'))
            }
            else if(sunin_pal.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Sunil Pal'))
            }
            else if(harkesh.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Harkesh'))
            }
            else if(mikail.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Mikail'))
            }
            else if(nafish.find(i=>i===JSON.parse(b).line_no)){
                console.log('im her')
                dispatch(mechanic_name('Nafish'))
            }
            else if(jitendra.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Jitendra'))
            }
            else if(vasid.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Vasid'))
            }
            else if(manoj.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Manoj'))
            }
            else if(ram_mahesh.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Ram Mahesh'))
            }
            else if(vikram.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Vikram'))
            }
            else if(adil.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Adil'))
            }
            else if(yoginder.find(i=>i===JSON.parse(b).line_no)){
                dispatch(mechanic_name('Yoginder'))
            }
            else{
                console.log('i am in else condition000000000000')
            }
            dispatch(scannerData(JSON.parse(b)));
            console.log(designation_type,'innn qrcode page')
            if(designation_type==="Machanic"){
                // navigate('/machanic')
                navigate("/mechanic", { replace: true });
            }else{
                navigate('/supervisor')
            }

        }
    }
   
    const handleErrorWebCam =(error)=>{
        console.log(error,'in handle web cam')
    }
    
    const handleSecondBtn =()=>{
        const obj = {"line_no":"1","machine_no":"1","machine_type":"priting","operation":"repair"}
  let b = JSON.stringify(obj).split(" ")[0];
        console.log(obj)
    }

    // const handleScanWebCam =(result)=>{
    //     if(result){
    //         setScanResultWebCam(result)
    //     }
    // }
    ///////////////////////////////////////////////////////////

   
    return(
        <div className={styles.container}>

      <div style={{backgroundColor:"whitesmoke"}}>
      <h1 >Scan your qr code</h1>

<Button type='primary' className={styles.qr_btn} onClick={openScaner}>Scan Qr Code</Button>
<Button type='primary' className={styles.qr_btn} onClick={handleSecondBtn}>Alert</Button>
      <input 
      type="file"
      ref={fileRef} 
      onChange={handleScaner}
      style={{display:'none'}}
      accept=".png, .jpg, .jpeg, .webp"/>
        {/* <QrReader 
        delay={300}
        style={{width:"100%"}}
        onError={handleErrorWebCam}
        onScan={handleScanWebCam}
        /> */}
        {/* <h3>Scaned by webCam code {scanResultWebCam}</h3> */}
      </div>
      <Scanner type='QR' onResult={(res) => setDecodedValue(res)} />
      </div>
    );
}
  