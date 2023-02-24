
import { Button } from 'antd';
import {useState,useRef } from 'react';
import QrScanner  from 'qr-scanner';
import { useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {scannerData} from './redux/pageSlice'
import styles from './pageStyle.module.css'
export const QrCode=()=>{
    const [file, setfile] = useState(null);
    // const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const designation_type = useSelector(state=>state.pageReducer.degination_type)
    const navigate = useNavigate('');
    const fileRef = useRef()
    const openScaner=()=>{
       fileRef.current.click();
    }
    const handleScaner=async (e)=>{
        const file = e.target.files[0];
        setfile(file);
        const result = await QrScanner.scanImage(file);
        if(result.length){
            const b = result.split(" ")[0]
            // setData(result.split(""))
            console.log(b,"+++++++++++white something saying")
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
    return(
        <div className={styles.container}>

      <div style={{backgroundColor:"whitesmoke"}}>
      <h1 >Scan your qr code</h1>

<Button type='primary' className={styles.qr_btn} onClick={openScaner}>Scan Qr Code</Button>
      <input 
      type="file"
      ref={fileRef} 
      onChange={handleScaner}
      style={{display:'none'}}
      accept=".png, .jpg, .jpeg, .webp"/>
      </div>
      </div>
    );
}
  