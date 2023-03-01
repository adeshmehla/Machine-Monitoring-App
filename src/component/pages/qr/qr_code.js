import {useState } from 'react';
import styles from './pageStyle.module.css'
import { Scanner } from './scanner';
export const QrCode=()=>{
    const [decodedValue, setDecodedValue] = useState("");
    return(
        <div className={styles.container}>
      <Scanner type='QR' onResult={(res) => setDecodedValue(res)} />
      </div>
    );
}
  