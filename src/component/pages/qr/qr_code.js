import styles from './pageStyle.module.css'
import { Scanner } from './scanner';
export const QrCode=()=>{
 
    return(
        <div className={styles.container}>
        <Scanner/>
      </div>
    );
  }
  